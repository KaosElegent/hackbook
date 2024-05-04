import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Organizer from "@/db/models/organizer";
import { getSession } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';

export const POST = async (req: NextRequest) => {
  try {
    //await connectDB();
    const session:any = await getSession();
    if(session){
      const user:UserProfile = session.user;
      let organizerAcc = await Organizer.find({ email: user.email }).exec();
      if(organizerAcc.length === 0){
        const organizer = new Organizer({
          name: user.name,
          email: user.email,
          discordName: "",
          hackathons: [],
        });
        await organizer.save();
        return NextResponse.json({ success:"New organizer was saved" }, { status: 200 })
      }
      else{
        return NextResponse.json({ success:"organizer already exists" }, { status: 200 })
      }
      
    }else{
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to create user", { status: 500 });
  }
};
