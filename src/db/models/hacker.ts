import { Schema, model, models } from "mongoose";

export interface IHacker {
  name: string;
  discordName: { type: String };
  email: string;
  hackathons: {
    hackathon: string;
    points: number;
    itemPoints: number;
  }[];
}

const HackerSchema = new Schema<IHacker>({
  name: { type: String, required: true },
  discordName: { type: String },
  email: { type: String, required: true, unique: true },
  hackathons: [
    {
      hackathon: { type: Schema.Types.ObjectId, ref: "Hackathon" },
      points: { type: Number, default: 0 },
      itemPoints: { type: Number, default: 0 },
    },
  ],
});

const Hacker = models.hackers || model("hackers", HackerSchema);

export default Hacker;
