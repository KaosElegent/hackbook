import mongoose from "mongoose";

import { env } from "@/env/server.mjs";

export default async function connectDB() {
  try {
    console.log(env.DATABASE_URL, env.DATABASE_NAME);
    await mongoose.connect(env.DATABASE_URL, { dbName: env.DATABASE_NAME });
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.info("MongoDB is connected 🟢");
    });

    connection.on("error", (err) => {
      console.error("MongoDB is not connected 🔴 \n", err);
      process.exit();
    });
  } catch (err) {
    console.error("MongoDB is not connected 💫 \n", err);
  }
}