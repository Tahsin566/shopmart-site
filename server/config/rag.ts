// server/test-retrieval.ts
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";



dotenv.config();

async function runTest() {

    const client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
    const db = client.db("auth_db"); // REPLACE WITH YOUR DB NAME
    const collection = db.collection("products");

    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        apiKey: process.env.GOOGLE_API_KEY!,
    });

    // Instead of just passing 'db.collection("products")'
    // Cast it using 'as any' or 'as unknown as ...'
    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
        collection: db.collection("products") as any, // This bypasses the strict type check
        indexName: "default",
        textKey: "text",
        embeddingKey: "embedding",
    });

    console.log("Searching...");
    const results = await vectorStore.similaritySearch("shoes", 1);
    console.log("Result Found:", results.length > 0 ? results[0].pageContent : "No results found");

    await client.close();
}

runTest().catch(console.error);