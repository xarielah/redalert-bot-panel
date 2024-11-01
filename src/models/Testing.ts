import mongoose from "mongoose";

export interface TestingDocument extends mongoose.Document {
  threat: number;
  cities: string;
  createdAt: string;
  notificationId: string;
  isDrill: boolean;
  time: number;
  updatedAt: string;
  touched: boolean;
}

const TestingSchema = new mongoose.Schema<TestingDocument>(
  {
    touched: {
      type: Boolean,
      default: false,
    },
    notificationId: {
      type: String,
      required: true,
    },
    threat: {
      type: Number,
      required: true,
    },
    cities: {
      type: String,
      required: true,
    },
    isDrill: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Testing ||
  mongoose.model("Testing", TestingSchema);
