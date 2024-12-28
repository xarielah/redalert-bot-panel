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

export async function getLogs(cursor: string | null, next: boolean = false, limit: number = 20) {
  await dbConnect();
  if (cursor) {
    const cursorRecord = await Log.findById(cursor);
    if (cursorRecord) {
      const filterObject = next ? { createdAt: { $gt: cursorRecord.createdAt } } : { createdAt: { $lt: cursorRecord.createdAt } };
      const results = await Log
        .find(filterObject)
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();
      return results.reverse();
    }
    else
      return null;
  } else {
    const results = await Log.find().sort({ createdAt: -1 }).limit(limit).exec();
    return results.reverse();
  }
}

export async function getLogsByDate(startDate: string, limit: number = 20) {
  await dbConnect();
  const results = await Log.find({ createdAt: { $lt: new Date(startDate) } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .exec();
  return results.reverse();
}