import mongoose from "mongoose";
import { AlertHeadingTypes } from "./alert-headings-types";

export interface AlertHeadingDocument extends mongoose.Document {
  type: string;
  heading: string;
}

const AlertHeadingSchema = new mongoose.Schema<AlertHeadingDocument>(
  {
    type: {
      type: String,
      required: [true, "Please provide a type from the enum"],
      enum: Object.values(AlertHeadingTypes),
      unique: true,
    },
    heading: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AlertHeading ||
  mongoose.model("AlertHeading", AlertHeadingSchema);
