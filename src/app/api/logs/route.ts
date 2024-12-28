import { LogDocument } from "@/models/Log";
import { createNewLog, getLogs } from "./logs-repository";

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

// export async function GET(req: Request) {
//   try {
//     const query = new URL(req.url).searchParams;
//     const l = query.get("limit");
//     const limit: number = l && Number.isInteger(+l) && +l > 0 ? +l : 100;
//     const prev = query.get("prev");
//     // Get the last logs
//     if (prev && Number.isInteger(+prev)) {
//       // Get the previous logs
//       const result = (await getPrevLogs(+prev, limit)).reverse();

//       // Construct the next endpoint
//       const prevEndpoint =
//         result.length > 0
//           ? "/api/logs?prev=" + result[0].time + "&limit=" + limit
//           : undefined;
//       const nextEndpoint =
//         result.length > 0
//           ? "/api/logs?next=" +
//             result[result.length - 1].time +
//             "&limit=" +
//             limit
//           : undefined;
//       return Response.json({
//         result: resultDto(result),
//         count: result.length,
//         limit: limit,
//         prev: prevEndpoint,
//         next: nextEndpoint,
//       });
//     }
//     const next = query.get("next");
//     if (next && Number.isInteger(+next)) {
//       const result = (await getDeltaLogs(+next, limit)).reverse();

//       // Construct the next endpoint
//       const nextEndpoint =
//         result.length > 0
//           ? "/api/logs?next=" +
//             result[result.length - 1].time +
//             "&limit=" +
//             limit
//           : undefined;
//       const prevEndpoint =
//         result.length > 0
//           ? "/api/logs?prev=" + result[0].time + "&limit=" + limit
//           : undefined;
//       return Response.json({
//         result: resultDto(result),
//         count: result.length,
//       });
//     }

//     return Response.json({
//       result: [],
//       count: 0,
//       limit: 0,
//       error: "Invalid query given",
//     });
//   } catch (error) {
//     console.log("🚀 ~ GET ~ error:", error);
//     return Response.json({
//       result: [],
//       count: 0,
//       limit: 0,
//       error: "Unexpceted error while fetching logs",
//     });
//   }
// }

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const cursor = searchParams.get("cursor");

  const data = await getLogs(cursor);

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
