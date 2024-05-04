import connectDB from "@/db/config";

import { NextRequest, NextResponse } from "next/server";
import Hacker from "@/db/models/hacker";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { firstName, lastName, email } = await req.json();

    const hacker = new Hacker({
      firstName,
      lastName,
      email,
      hackathons: [],
    });

    await hacker.save();

    return new Response("User created successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create user", { status: 500 });
  }
};

export async function GET() {
  try {
    await connectDB();

    const hackers = await Hacker.find({});

    return NextResponse.json(hackers, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};


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