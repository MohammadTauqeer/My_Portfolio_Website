import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("GOOGLE_API_KEY not found in environment");
  process.exit(1);
}

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const models = await genAI.listModels();
    console.log(JSON.stringify(models, null, 2));
  } catch (error) {
    console.error("Error fetching models:", error.message);
    process.exit(1);
  }
}

listModels();
