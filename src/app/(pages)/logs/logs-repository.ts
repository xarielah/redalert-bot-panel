import dbConnect from "@/database/db-connect";
import Log, { LogDocument } from "@/models/Log";

export async function getLogById(id: string): Promise<LogDocument | null> {
  await dbConnect();
  return Log.findById(id);
}
