import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Hackathon from "@/db/models/hackathon";
import Organizer from "@/db/models/organizer";
import { getSession } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';

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

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("fetching data")
  try {
    await connectDB();
    const session:any = await getSession();

    if(session){
      const urlParams = new URLSearchParams(req.url.split('?')[1]);
      const userType = urlParams.get('type');
      const user:UserProfile = session.user;

      console.log(userType);
      console.log(user.email);
      if (userType === 'organizer') {
        const hackathons = await Hackathon.find({organizers: {$in: [user.email]}});
      
        return NextResponse.json(hackathons, { status: 200 });
      }
      else{
        const hackathons = await Hackathon.find({hackers: {$in: [user.email]}});
        return NextResponse.json(hackathons, { status: 200 });
      }
    }
    else{
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
