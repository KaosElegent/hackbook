import { Schema, model, models } from "mongoose";

const HackathonSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    organizers: [{ type: String, ref: "Organizer" }],
    hackers: [{ type: String, ref: "Hacker" }],
    events: [
      {
        name: { type: String, required: true },
        startDate: { type: Date, required: true },
        points: { type: Number, required: true },
        attendees: [{ type: String, ref: "HackerEmail" }],
      },
    ],
    shop: [
      {
        name: { type: String, unique: true, required: true },
        points: { type: Number, rquired: true },
        image: { type: String },
        description: { type: String },
      },
    ],
    hackString: { type: String, default: "" },
    }
);

const Hackathon = models.hackathons || model("hackathons", HackathonSchema);

export default Hackathon;
