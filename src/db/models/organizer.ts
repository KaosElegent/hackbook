import { Schema, model, models } from "mongoose";

const OrganizerSchema = new Schema({
  name: { type: String, required: true},
  discordName: { type: String },
  email: { type: String, required: true, unique: true },
  hackathons: [{ type: Schema.Types.ObjectId, ref: "Hackathon" }],
});

const Organizer = models.organizers || model("organizers", OrganizerSchema);

export default Organizer;
