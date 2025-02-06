import dotenv from "dotenv";
dotenv.config();

export const API_URL: string = process.env.API_URL || "http://localhost:3001/";
