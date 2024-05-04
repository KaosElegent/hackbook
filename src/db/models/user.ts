import { Schema, model, models } from "mongoose";

export interface IHacker {
  firstName: string;
  lastName: string;
  email: string;
  hackathons: {
    hackathon: string;
    points: number;
  }[];
}

const HackerSchema = new Schema<IHacker>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hackathons: [
    {
      hackathon: { type: Schema.Types.ObjectId, ref: "Hackathon" },
      points: { type: Number, default: 0 },
    },
  ],
});

const Hacker = models.hackers || model("hackers", HackerSchema);

export default Hacker;
