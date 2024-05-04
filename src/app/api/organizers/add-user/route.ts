import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Hacker from "@/db/models/hacker";
import Hackathon from "@/db/models/hackathon";

export const POST = async (req: NextRequest) => {
  try {
    //await connectDB();

    const { id, email } = await req.json();

    const hackathon = await Hackathon.findOne({ _id: id });
    const user = await Hacker.findOne({ email });

    if (!hackathon) {
      return new Response("Hackathon not found", { status: 404 });
    }

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Add logic here to associate the user with the hackathon

    user.hackathons.push({ hackathon: id, points: 0 });
    hackathon.hackers.push(email);

    await user.save();
    await hackathon.save();

    return new Response("User added to the hackathon successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add user", { status: 500 });
  }
};
