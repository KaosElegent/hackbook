import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Organizer from "@/db/models/organizer";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { firstName, lastName, email } = await req.json();

    const organizer = new Organizer({
      firstName,
      lastName,
      email,
      hackathons: [],
    });

    await organizer.save();

    return new Response("Organizer created successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create organizer", { status: 500 });
  }
};
