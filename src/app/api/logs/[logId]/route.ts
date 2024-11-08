import { getLogById } from "@/app/(pages)/admin/logs/logs-repository";
import { isValidObjectId } from "mongoose";

interface ILogParams {
  params: Promise<{ logId: string }>;
}

export async function GET(req: Request, { params }: ILogParams) {
  const p = await params;
  if (!p.logId || !isValidObjectId(p.logId))
    return Response.json(
      { message: "Invalid log identification" },
      { status: 400 }
    );

  const logRecord = await getLogById(p.logId);

  if (!logRecord)
    return Response.json({ message: "Log not found" }, { status: 404 });

  const logRecordDto = {
    id: logRecord._id,
    message: logRecord.message,
    level: logRecord.level,
    time: logRecord.time,
  };

  return Response.json({
    result: logRecordDto,
  });
}
