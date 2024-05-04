import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/db/config";
import Hacker, { type IHacker } from "@/db/models/user";

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

export async function GET() {
  try {
    connectDB();

    const meals = await Hacker.find({});

    return NextResponse.json(meals, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
