import mongoose from "mongoose";

export enum MapColorTypes {
  NORMAL = "normal",
  SPECIAL = "special",
}

export interface MapColorsDocument extends mongoose.Document {
  type: MapColorTypes;
  color: string;
}

const MapColorsSchema = new mongoose.Schema<MapColorsDocument>(
  {
    type: {
      type: String,
      required: [true, "Please provide type normal or special"],
      enum: Object.values(MapColorTypes),
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MapColors ||
  mongoose.model("MapColor", MapColorsSchema);
