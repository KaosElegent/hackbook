import { Schema, model, models } from "mongoose";

const HackerSchema = new Schema({
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

const Hacker = models.Hacker || model("Hackers", HackerSchema);

export default Hacker;
