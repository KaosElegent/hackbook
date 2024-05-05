import mongoose from "mongoose";

import { NextRequest } from "next/server";
import Hackathon from "@/db/models/hackathon";

mongoose.connect(process.env.MONGODB_URI || "", {
  dbName: process.env.DATABASE_NAME || "",
});

export const POST = async (req: NextRequest) => {
  try {
    const { id, name, description, points, image } = await req.json();

    const item: {
      name: string;
      points: number;
      description?: string;
      image?: string;
    } = { name, points };

    if (description) {
      item["description"] = description;
    }

    if (image) {
      item["image"] = image;
    }

    const hackathon = await Hackathon.findById(id);
    if (!hackathon) {
      return new Response("Hackathon not found", { status: 404 });
    }

    hackathon.shop.push(item);
    hackathon.save();

    return new Response("Item created successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to create item", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    const hackathon = await Hackathon.findById(id);

    if (!hackathon) {
      return new Response("Hackathon not found", { status: 404 });
    }

    return new Response(JSON.stringify(hackathon.shop), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get items", { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { id, oldName, newName, description, points, image } =
      await req.json();

    const hackathon = await Hackathon.findById(id);

    const item = hackathon.shop.find(
      (item: { name: any }) => item.name == oldName
    );

    item.name = newName;
    item.points = points;
    item.description = description;
    item.image = image;

    hackathon.save();

    return new Response("Item updated successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update item", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { id, name } = await req.json();

    const hackathon = await Hackathon.findById(id);

    hackathon.shop = hackathon.shop.filter(
      (item: { name: any }) => item.name != name
    );

    hackathon.save();

    return new Response("Item deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete item", { status: 500 });
  }
};
