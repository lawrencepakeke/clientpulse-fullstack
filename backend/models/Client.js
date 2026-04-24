import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  industry: {
    type: String
  },
  region: {
    type: String
  },
  segment: {
    type: String // custom field (important for lab)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Client", clientSchema);