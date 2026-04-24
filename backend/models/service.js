import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  price: {
    type: Number
  }
});

export default mongoose.model("Service", serviceSchema);