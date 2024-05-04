import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Hackathon from "@/db/models/hackathon";

export const POST = async (req: NextRequest) => {
  try {
    //await connectDB();

    const { id, name, location, startDate, endDate, points } = await req.json();

    const event = {
      name,
      location,
      startDate,
      endDate,
      points,
      attendees: [],
    };

    const hackathon = await Hackathon.findById(id);
    if (!hackathon) {
      return new Response("Hackathon not found", { status: 404 });
    }

    hackathon.events.push(event);

    await hackathon.save();

    return new Response("Event created successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create event", { status: 500 });
  }
};
