import dbConnect from "@/database/db-connect";
import { AlertHeadingTypes } from "@/models/alert-headings-types";
import AlertHeadings from "@/models/AlertHeadings";

export async function getAllHeadings() {
  await dbConnect();
  return AlertHeadings.find({});
}

export async function updateHeadings(type: AlertHeadingTypes, heading: string) {
  await dbConnect();
  return AlertHeadings.findOneAndUpdate(
    { type },
    { heading },
    { new: true, upsert: true }
  );
}
