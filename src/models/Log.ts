import mongoose from "mongoose";

export interface LogDocument extends mongoose.Document {
  message: string;
  time: number;
  level: string;
}

const LogSchema = new mongoose.Schema<LogDocument>(
  {
    message: { type: String, required: true },
    time: { type: Number, default: Date.now },
    level: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Log ||
  mongoose.model<LogDocument>("Log", LogSchema);
