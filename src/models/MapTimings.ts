import mongoose from "mongoose";
import { MapTimingsTypes } from "./map-timing-types";

export interface MapTimingsDocument extends mongoose.Document {
  type: MapTimingsTypes;
  value: number;
}

const MapTimingsSchema = new mongoose.Schema<MapTimingsDocument>(
  {
    type: {
      type: String,
      required: true,
      enum: Object.values(MapTimingsTypes),
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MapTimings ||
  mongoose.model("MapTimings", MapTimingsSchema);
