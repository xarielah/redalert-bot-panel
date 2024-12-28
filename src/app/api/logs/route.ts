import { LogDocument } from "@/models/Log";
import { createNewLog, getLogs, getLogsByDate } from "./logs-repository";

function resultDto(result: LogDocument[]) {
  if (!Array.isArray(result) || !result || result.length === 0) return [];
  return result.map((r) => ({
    message: r.message,
    level: r.level,
    time: r.time,
    date: new Date(r.time).toISOString(),
    id: r._id,
  }));
}

export interface LogsAPIResponse {
  result: LogDocument[];
  count: number;
  limit: number;
  next?: string;
  prev?: string;
  error?: string;
}

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const cursor = searchParams.get("cursor");
  const startDate = searchParams.get("startDate");
  const next = searchParams.get("next") === "true";

  let promise;

  if (startDate && !cursor)
    promise = getLogsByDate(startDate);
  else
    promise = getLogs(cursor, next);

  const data = await promise;

  if (!data)
    return Response.json({
      result: [],
      count: 0,
      error: "Invalid query given",
    }, { status: 400 });

  return Response.json({
    result: resultDto(data),
    count: data.length,
  });
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
