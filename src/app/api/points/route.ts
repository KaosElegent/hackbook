import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Organizer from "@/db/models/organizer";
import Hacker from "@/db/models/hacker";
import { getSession } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';

import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI || "", { dbName: process.env.DATABASE_NAME || "" });


export async function GET(req: NextRequest, res: NextResponse) {
  console.log("starting point fetch")
  try {
    //await connectDB();
    const session: any = await getSession();

    if (session) {
      const urlParams = new URLSearchParams(req.url.split("?")[1]);
      const hackathon_id = urlParams.get("id");
      const user: UserProfile = session.user;
      console.log(hackathon_id)

        const userAccs = await Hacker.find({ email: user.email });
        console.log(userAccs[0].hackathons[0].hackathon.valueOf())
        const events = await userAccs[0].hackathons.filter((h:any) => h.hackathon.valueOf() === hackathon_id);
        console.log(events)
        return NextResponse.json(events[0].itemPoints, { status: 200 });
    } else{
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
