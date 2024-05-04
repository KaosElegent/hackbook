import { Schema, model, models } from "mongoose";

type Event = {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  points: number;
  attendees: [{ type: Schema.Types.ObjectId; ref: "Hacker" }];
};

const HackathonSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organizers: [{ type: Schema.Types.ObjectId, ref: "Organizer" }],
  hackers: [{ type: Schema.Types.ObjectId, ref: "Hacker" }],
  events: [{ type: Event }],
});

const Hackathon = models.Hackathon || model("Hackathons", HackathonSchema);

export default Hackathon;
