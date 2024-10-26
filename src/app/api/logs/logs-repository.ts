import dbConnect from "@/database/db-connect";
import Log from "@/models/Log";

export async function createNewLog(payload: any) {
  await dbConnect();
  return Log.create(payload);
}

export async function getAllLogs() {
  const time = new Date().getTime() - 24 * 60 * 60 * 1000;
  return getDeltaLogs(time);
}

export async function getDeltaLogs(delta: number) {
  await dbConnect();
  return Log.find({ time: { $gt: delta } });
}
