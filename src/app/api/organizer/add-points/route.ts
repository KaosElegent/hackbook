import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Hacker from "@/db/models/user";
import Hackathon from "@/db/models/hackathon";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { hackId, email, eventId } = await req.json();

    const hackathon = await Hackathon.findOne({ _id: hackId });
    const user = await Hacker.findOne({ email });
    const event = hackathon.events.find(
      (event: { _id: any }) => event._id == eventId
    );

    const userHackathon = user.hackathons.find(
      (hackathon: { hackathon: any }) => hackathon.hackathon == hackId
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
