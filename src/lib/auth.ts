import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const MONGODB_URI  = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Mongodb uri is missing!")
}

const client = new MongoClient(MONGODB_URI);
const db = client.db("Mediqueue_TS");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
  },
});