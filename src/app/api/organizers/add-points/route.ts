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

    const userHackathon = user.hackathons.find(
      (hackathon: { hackathon: any }) => hackathon.hackathon == id
    );

    if (!hackathon) {
      return new Response("Hackathon not found", { status: 404 });
    }

    const event = hackathon.events.find(
      (event: { name: any }) => event.name === name
    );

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (!event) {
      return new Response("Event not found", { status: 404 });
    }

    // Add logic here to associate the user with the hackathon

    if (event.attendees.includes(email)) {
      return new Response("User already exists in the event attendees", {
        status: 400,
      });
    }
    event.attendees.push(email);
    userHackathon.points += event.points;
    userHackathon.itemPoints += event.points;

    await user.save();
    await hackathon.save();
    
    /*
   if(userHackathon){
    console.log(await Hackathon.find({ _id: id, "events.name": name }));
    console.log(await Hacker.find({email: email, hackathons: {$elemMatch: { hackathon: id }}}));

    await Hackathon.updateOne({ _id: id, "events.name": name }, { $push: { "events.$.attendees": email } });
    await Hacker.updateOne({email: email, hackathons: {$elemMatch: { hackathon: id }}}, { $inc: { "hackathons.$.points": event.points } });
    */
    return new Response("Points added successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add points", { status: 500 });
  }
};