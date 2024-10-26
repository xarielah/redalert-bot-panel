import dbConnect from "@/database/db-connect";
import Log from "@/models/Log";

export async function createNewLog(payload: any) {
  await dbConnect();
  return Log.create(payload);
}

export async function getAllLogs() {
  await dbConnect();
  return Log.find({});
}

export async function getDeltaLogs(delta: number) {
  await dbConnect();
  return Log.find({ time: { $gt: delta - 1000 * 60 * 60 } });
}
