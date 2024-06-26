import connectDB from "../config";

import { NextRequest, NextResponse } from "next/server";
import Hackathon from "@/db/models/hackathon";
import Organizer from "@/db/models/organizer";
import Hacker from "@/db/models/hacker";
import { getSession } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI || "", { dbName: process.env.DATABASE_NAME || "" });

export const POST = async (req: NextRequest) => {
  try {
    //await connectDB();

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

export async function PUT(req: NextRequest) {
  try {
    //await connectDB();

    const { id, name, location, startDate, endDate } = await req.json();

    const hackathon = await Hackathon.findById(id);

    hackathon.name = name;
    hackathon.location = location;
    hackathon.startDate = startDate;
    hackathon.endDate = endDate;
    hackathon.save();

    return new Response("Hackathon updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update hackathon", { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("fetching data");
  try {
    //await connectDB();
    const session:any = await getSession();

    if (session) {
      const urlParams = new URLSearchParams(req.url.split("?")[1]);
      const userType = urlParams.get("type");
      const user: UserProfile = session.user;

      console.log(userType);
      console.log(user.email);
      if (userType === "organizer") {
        const hackathons = await Hackathon.find({
          organizers: { $in: [user.email] },
        });

        return NextResponse.json(hackathons, { status: 200 });
      } else {
        const hackathons = await Hackathon.find({
          hackers: { $in: [user.email] },
        });
        return NextResponse.json(hackathons, { status: 200 });
      }
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    //await connectDB();
    const { id } = await req.json();

    const hackathon = await Hackathon.findByIdAndDelete(id);
    const organizers = await Organizer.find({ hackathons: id });
    const hackers = await Hacker.find({ "hackathons.hackathon": id });
    console.log(hackers);

    organizers.forEach(async (organizer) => {
      organizer.hackathons.splice(organizer.hackathons.indexOf(id), 1);
      await organizer.save();
    });

    hackers.forEach(async (hacker) => {
      hacker.hackathons = hacker.hackathons.filter(
        (hackathon: any) => hackathon.hackathon != id
      );
      await hacker.save();
    });

    hackathon.deleteOne();

    return new Response("Hackathon deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete hackathon", { status: 500 });
  }
}
