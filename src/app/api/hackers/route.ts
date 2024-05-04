import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Hacker from "@/db/models/hacker";
import Hackathon from "@/db/models/hackathon";
import { user } from "@nextui-org/react";
import { getSession } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';

export const POST = async (req: NextRequest) => {
  try {
    //await connectDB();

    const session:any = await getSession();

    if(session){
      const user:UserProfile = session.user;

      let hackerAcc = await Hacker.find({ email: user.email }).exec();

      if(hackerAcc.length === 0){
        const hacker = new Hacker({
          name: user.name,
          email: user.email,
          discordName: "",
          hackathons: [],
        });
    
        await hacker.save();
        return NextResponse.json({ success:"New hacker was saved" }, { status: 200 })
      }
      else{
        return NextResponse.json({ success:"Hacker already exists" }, { status: 200 })
      }
      
    }else{
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to create user", { status: 500 });
  }
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    //await connectDB();

    const hackers = await Hacker.find({});

    return NextResponse.json(hackers, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { email, id } = await req.json();

    const hacker = await Hacker.findOne({ email });
    const hackathon = await Hackathon.findById(id);

    if (!hacker) {
      return new Response("User not found", { status: 404 });
    }

    if (!hackathon) {
      return new Response("Hackathon not found", { status: 404 });
    }

    hackathon.hackers.splice(hackathon.hackers.indexOf(email), 1);
    hacker.hackathons = hacker.hackathons.filter(
      (h: { hackathon: any }) => h.hackathon != id
    );

    await hackathon.save();
    await hacker.save();

    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete user", { status: 500 });
  }
}

/*
let submission: Omit<IHacker, "code"> = {
  firstName: "",
  lastName: "",
  email: "",
  hackathons: [
    {
      hackathon: "",
      points: 0,
    },
  ],
};

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    submission = await request.json();

    await new Hacker({ ...submission }).save();

    return NextResponse.json(
      {
        message: `${submission.email} created successfully!`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { type: "UnauthorizedError", error: "Invalid request" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
*/
