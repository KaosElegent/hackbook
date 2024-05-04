import connectDB from "../config";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    console.log(process.env.MONGODB_URI, process.env.DATABASE_NAME);
    await mongoose.connect(process.env.MONGODB_URI || "", { dbName: process.env.DATABASE_NAME || "" });
    const connection = mongoose.connection;
    console.log("Connecting to Mongo!");
    connection.on("connected", () => {
        console.info("MongoDB is connected 🟢");
    });

    connection.on("error", (err) => {
        console.error("MongoDB is not connected 🔴 \n", err);
        process.exit();
    });
      
    return NextResponse.json({ message: "ok"}, { status: 200 });
  } catch (error: any) {
    console.error("MongoDB is not connected 💫 \n", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
