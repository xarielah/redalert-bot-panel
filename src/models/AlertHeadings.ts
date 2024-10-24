import mongoose from "mongoose";

enum AlertTypes {
  MISSILE_ALERT = "MISSILE_ALERT",
  DRONE_ALERT = "DRONE_ALERT",
  HAZARD_ALERT = "HAZARD_ALERT",
  TSUNAMI_ALERT = "TSUNAMI_ALERT",
  EARTHQUAKE_ALERT = "EARTHQUAKE_ALERT",
  INVASION_ALERT = "INVASION_ALERT",
  RADIOACTIVE_ALERT = "RADIOACTIVE_ALERT",
  UNCONVENTIONAL_ALERT = "UNCONVENTIONAL_ALERT",
  GENERAL_ALERT = "GENERAL_ALERT",
  DRILL_ALERT = "DRILL_ALERT",
}

export interface AlertHeadingDocument extends mongoose.Document {
  type: string;
  heading: string;
}

const AlertHeadingSchema = new mongoose.Schema<AlertHeadingDocument>(
  {
    type: {
      type: String,
      required: [true, "Please provide a type from the enum"],
      enum: Object.values(AlertTypes),
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
