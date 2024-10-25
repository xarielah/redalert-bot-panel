import dbConnect from "@/database/db-connect";
import { MapColorTypes } from "@/models/map-color-types";
import { MapTimingsTypes } from "@/models/map-timing-types";
import MapColor from "@/models/MapColors";
import MapTimings from "@/models/MapTimings";

export async function getColors() {
  await dbConnect();
  return await MapColor.find({});
}

export async function updateColors(type: MapColorTypes, color: string) {
  await dbConnect();
  return await MapColor.findOneAndUpdate(
    { type },
    { color },
    { new: true, upsert: true }
  );
}

export async function getTimings() {
  await dbConnect();
  return await MapTimings.find({});
}

export async function updateTimings(type: MapTimingsTypes, timing: number) {
  await dbConnect();
  return await MapTimings.findOneAndUpdate(
    { type },
    { value: timing },
    { new: true, upsert: true }
  );
}
