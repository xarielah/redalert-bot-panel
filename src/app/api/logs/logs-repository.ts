import dbConnect from "@/database/db-connect";
import Log, { LogDocument } from "@/models/Log";

export async function createNewLog(payload: any) {
  await dbConnect();
  return Log.create(payload);
}

export async function getDeltaLogs(
  delta: number,
  limit: number
): Promise<LogDocument[]> {
  await dbConnect();
  return Log.find({ time: { $gt: delta } })
    .sort({ time: -1 })
    .limit(limit);
}

export async function getPrevLogs(
  delta: number,
  limit: number
): Promise<LogDocument[]> {
  await dbConnect();
  return Log.find({ time: { $lt: delta } })
    .sort({ time: -1 })
    .limit(limit);
}
