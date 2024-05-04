import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Hacker from "@/db/models/user";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { firstName, lastName, email } = await req.json();

    const hacker = new Hacker({
      firstName,
      lastName,
      email,
      hackathons: [],
    });

    await hacker.save();

    return new Response("User created successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create user", { status: 500 });
  }
};
