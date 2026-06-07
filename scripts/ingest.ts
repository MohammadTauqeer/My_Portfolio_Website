import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PineconeStore } from "@langchain/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import * as fs from "fs";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

async function run() {
  const filePath = "knowledge_base.txt";
  const dataPath = "lib/data.ts";
  
  if (!fs.existsSync(filePath)) {
    console.error("Knowledge base file not found: knowledge_base.txt");
    return;
  }

  console.log("Loading knowledge base and project data...");
  let text = fs.readFileSync(filePath, "utf8");

  if (fs.existsSync(dataPath)) {
    const dataText = fs.readFileSync(dataPath, "utf8");
    text += "\n\n## Project and Blog Data (from lib/data.ts)\n\n" + dataText;
  } else {
    console.warn("Project data file not found: lib/data.ts");
  }

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 400,
  });

  console.log("Splitting text into chunks...");
  const docs = await textSplitter.createDocuments([text]);

  console.log(`Split into ${docs.length} documents.`);

  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not defined in .env.local");
  }

  if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX_NAME) {
    throw new Error("PINECONE_API_KEY or PINECONE_INDEX_NAME is not defined in .env.local");
  }

  console.log("Initializing embeddings and Pinecone...");
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "gemini-embedding-001",
  });

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

  console.log("Upserting vectors into Pinecone...");

  // Wrapper for embeddings to slice vectors
  const slicedEmbeddings = {
    embedQuery: async (text: string) => {
      const vector = await embeddings.embedQuery(text);
      return vector.slice(0, 1536);
    },
    embedDocuments: async (texts: string[]) => {
      const vectors = await embeddings.embedDocuments(texts);
      return vectors.map(v => v.slice(0, 1536));
    }
  };

  // Verify embeddings are generated and sliced
  const testEmbed = await slicedEmbeddings.embedQuery("test");
  console.log(`Test embedding dimension: ${testEmbed.length}`);
  
  if (testEmbed.length === 0) {
    throw new Error("Failed to generate embeddings: vector is empty.");
  }

  await PineconeStore.fromDocuments(docs, slicedEmbeddings as any, {
    pineconeIndex: index,
    textKey: "text",
  });

  console.log("Embeddings generated successfully.");
  console.log("Ingestion successfully completed.");
}

run().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});
