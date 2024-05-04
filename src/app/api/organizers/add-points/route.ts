import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Hacker from "@/db/models/hacker";
import Hackathon from "@/db/models/hackathon";

export const POST = async (req: NextRequest) => {
  try {
    //await connectDB();

    const { id, email, name } = await req.json();

    const hackathon = await Hackathon.findOne({ _id: id });
    const user = await Hacker.findOne({ email });
    const event = hackathon.events.find(
      (event: { name: any }) => event.name == name
    );

    const userHackathon = user.hackathons.find(
      (hackathon: { hackathon: any }) => hackathon.hackathon == id
    );

    if (!hackathon) {
      return new Response("Hackathon not found", { status: 404 });
    }

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Add logic here to associate the user with the hackathon

    if (event.attendees.includes(user._id)) {
      return new Response("User already exists in the event attendees", {
        status: 400,
      });
    }
    event.attendees.push(user._id);
    userHackathon.points += event.points;

    await user.save();
    await hackathon.save();

    return new Response("Points added successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add points", { status: 500 });
  }
};
