import mongoose from "mongoose";

import { NextRequest } from "next/server";
import Hacker from "@/db/models/hacker";
import Hackathon from "@/db/models/hackathon";

mongoose.connect(process.env.MONGODB_URI || "", {
  dbName: process.env.DATABASE_NAME || "",
});

export const POST = async (req: NextRequest) => {
  try {
    //await connectDB();

    const { id, email, name } = await req.json();

    const hackathon = await Hackathon.findOne({ _id: id });
    const user = await Hacker.findOne({ email });
    const item = hackathon.shop.find(
      (item: { name: any }) => item.name == name
    );

    const userHackathon = user.hackathons.find(
      (hackathon: { hackathon: any }) => hackathon.hackathon == id
    );

    if (!hackathon) {
      return new Response("Hackathon not found", { status: 404 });
    }

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Add logic here to associate the user with the hackathon
    if (userHackathon.itemPoints >= item.points) {
      userHackathon.itemPoints -= item.points;
    } else {
      return new Response("Not enough points", { status: 400 });
    }

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
