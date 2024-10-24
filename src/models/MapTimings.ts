import mongoose from "mongoose";

export enum MapTimingsTypes {
  MAP_GENERATION = "map_generation",
  RESET_SPECIAL_CACHE = "reset_special_cache",
}

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
