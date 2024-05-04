import { Schema, model, models } from "mongoose";

const HackathonSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organizers: [{ type: Schema.Types.ObjectId, ref: "Organizer" }],
  hackers: [{ type: Schema.Types.ObjectId, ref: "Hacker" }],
  events: [{
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    points: { type: Number, required: true },
    attendees: [{ type: String, ref: "HackerEmail" }],
  }],
});

const Hackathon = models.hackathons || model("hackathons", HackathonSchema);

export default Hackathon;
