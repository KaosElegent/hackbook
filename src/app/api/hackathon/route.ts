import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Hackathon from "@/db/models/hackathon";
import Organizer from "@/db/models/organizer";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { email, name, location, startDate, endDate } = await req.json();

    const hackathon = new Hackathon({
      name,
      location,
      startDate,
      endDate,
      organizers: [email],
      hackers: [],
      events: [],
    });

    const savedHackathon = await hackathon.save();
    const hackathonId = savedHackathon._id;

    const organizer = await Organizer.findOne({ email });
    if (!organizer) {
      return new Response("Organizer not found", { status: 404 });
    }

    organizer.hackathons.push(hackathonId);
    await organizer.save();

    return new Response("Hackathon created successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to create hackathon", { status: 500 });
  }
};
