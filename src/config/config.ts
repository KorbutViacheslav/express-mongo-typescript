import dotenv from "dotenv";
import { mongo } from "mongoose";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://korbutjava:korbutjava@cluster0.wtqg6as.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const SERVER_PORT = 9090 ? Number(9090) : 1337;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
