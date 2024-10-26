import { LogDocument } from "@/models/Log";
import { auth } from "@clerk/nextjs/server";
import { createNewLog, getAllLogs, getDeltaLogs } from "./logs-repository";

function resultDto(result: LogDocument[]) {
  if (!Array.isArray(result) || !result || result.length === 0) return [];
  return result.map((r) => ({
    message: r.message,
    level: r.level,
    time: r.time,
    id: r._id,
  }));
}

export async function GET(req: Request) {
  await auth.protect();
  try {
    const query = new URL(req.url).searchParams;
    if (query.has("from")) {
      const deltaTimestamp = parseInt(query.get("from") as string);
      const result = await getDeltaLogs(deltaTimestamp);
      return Response.json({
        result: resultDto(result),
      });
    }
    // All logs from the past 24 hours
    const result = await getAllLogs();
    return Response.json({
      result: resultDto(result),
    });
  } catch (error) {
    return Response.json({ error: "Getting logs has failed" });
  }
}

export async function POST(req: Request) {
  const token = req.headers.get("x-auth-token");
  if (!token || token !== process.env.LOGGING_SECRET)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const result = await createNewLog(body);
    return Response.json({
      message: `Log (id:${result._id}) created successfuly`,
    });
  } catch (error) {
    return Response.json({ error: "POST request failed" });
  }
}
