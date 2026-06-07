import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const googleApiKey = process.env.GOOGLE_API_KEY;
    const pineconeApiKey = process.env.PINECONE_API_KEY;
    const indexName = process.env.PINECONE_INDEX_NAME;

    if (!googleApiKey || googleApiKey.trim() === "") {
      console.error("GOOGLE_API_KEY is missing or empty in environment variables.");
      return NextResponse.json({ error: "GOOGLE_API_KEY is missing" }, { status: 500 });
    }

    // 1. Initialize Embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: googleApiKey,
      modelName: "gemini-embedding-001",
    });

    // Wrapper for embeddings to slice vectors to 1536 (matching ingestion script)
    const slicedEmbeddings = {
      embedQuery: async (text: string) => {
        const vector = await embeddings.embedQuery(text);
        return vector.slice(0, 1536);
      },
      embedDocuments: async (texts: string[]) => {
        const vectors = await embeddings.embedDocuments(texts);
        return vectors.map((v) => v.slice(0, 1536));
      },
    };

    // 2. Perform similarity search in Pinecone
    const pinecone = new Pinecone({
      apiKey: pineconeApiKey || "",
    });
    const index = pinecone.Index(indexName || "");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pineconeStore = await PineconeStore.fromExistingIndex(slicedEmbeddings as any, {
      pineconeIndex: index,
      textKey: "text",
    });

    const results = await pineconeStore.similaritySearch(query, 20);
    const context = results.map((r) => r.pageContent).join("\n\n");

    // 3. Generate response using Gemini
    if (!googleApiKey || googleApiKey.trim() === "") {
      throw new Error("GOOGLE_API_KEY is not configured correctly.");
    }

    const genAI = new GoogleGenerativeAI(googleApiKey);
    if (!genAI) {
      console.warn("Warning: GoogleGenerativeAI client configuration might be incompatible or failed to initialize.");
    }
    const model = genAI.getGenerativeModel(
      { model: "gemini-2.5-flash" }, 
      { apiVersion: "v1" }
    );

    const prompt = `You are Mohammad Tauqeer's AI assistant. You must ONLY respond in Roman Urdu (as spoken in Karachi). Be professional yet friendly. Search the entire project list provided in the context below to give a complete answer. Use the following context to answer the user's query about his projects, skills, and experience: ${context}. If information is not in the provided context, suggest the user to contact Tauqeer directly. Do not use formal Hindi words like 'anubhav' or 'vishesh'. Use simple Roman Urdu.

User Query: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: unknown) {
    console.error("Chat API Error Details:", error);
    return NextResponse.json({ text: "Model error: Check logs" });
  }
}
