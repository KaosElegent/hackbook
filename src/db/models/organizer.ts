import { Schema, model, models } from "mongoose";

const OrganizerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hackathons: [{ type: Schema.Types.ObjectId, ref: "Hackathon" }],
});

const Organizer = models.organizers || model("organizers", OrganizerSchema);

export default Organizer;
