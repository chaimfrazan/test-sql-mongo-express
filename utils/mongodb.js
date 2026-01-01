import { MongoClient } from "mongodb";
import dotenv from "dotenv";

let mongocClient = null;
let mongoConn = null;

dotenv.config();
export async function initMongoDb() {
  try {
    mongocClient = new MongoClient(process.env.MONGO_URI.toString());
    await mongocClient.connect();
    console.log("connected to mongo db");
    mongoConn = mongocClient.db(process.env.DB_NAME.toString());
    const collection = mongoConn.collection("users collection");
    await collection.createIndex({ name: 1 }, { unique: true });
    console.log("Created index");
  } catch (error) {
    console.log(error.message);
  }
}

export async function getMongoDbConnection() {
  if (!mongoConn) {
    if (!mongocClient) {
      mongocClient = new MongoClient(process.env.MONGO_URI);
      await mongocClient.connect();
    }
    mongoConn = mongocClient.db(process.env.DB_NAME);
  }
  console.log(mongoConn);
  return mongoConn;
}
