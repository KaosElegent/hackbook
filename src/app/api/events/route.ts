import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Hackathon from "@/db/models/hackathon";
import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI || "", { dbName: process.env.DATABASE_NAME || "" });


export const POST = async (req: NextRequest) => {
  try {
    //await connectDB();

    const { id, name, location, startDate, endDate, points, description } = await req.json();

    const event = {
      name,
      description,
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

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    //await connectDB();

    const { id } = await req.json();

    const hackathon = await Hackathon.findById(id);

    if (!hackathon) {
      return new Response("Hackathon not found", { status: 404 });
    }

    return new Response(JSON.stringify(hackathon.events), { status: 200 });
  } catch (error) {
    return new Response("Failed to get events", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    //await connectDB();

    const { id, oldName, newName, location, startDate, endDate, points, description } =
      await req.json();

    const hackathon = await Hackathon.findById(id);
    const event = hackathon.events.find(
      (event: { name: any }) => event.name === oldName
    );

    event.name = newName;
    event.location = location;
    event.description = description;
    event.startDate = startDate;
    event.endDate = endDate;
    event.points = points;
    hackathon.save();

    return new Response("Event updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update event", { status: 500 });
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    //await connectDB();

    const { id, name } = await req.json();

    const hackathon = await Hackathon.findById(id);
    if (!hackathon) {
      return new Response("Hackathon not found", { status: 404 });
    }

    hackathon.events = hackathon.events.filter(
      (event: { name: any }) => event.name != name
    );

    hackathon.save();

    return new Response("Event deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete event", { status: 500 });
  }
};
