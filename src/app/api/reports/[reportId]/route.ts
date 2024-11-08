import { isValidObjectId } from "mongoose";
import { reportDto } from "../reports-dto";
import { getReport } from "../reports-repository";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ reportId: string }> }
) {
  try {
    const { reportId } = await params;
    if (!reportId || !isValidObjectId(reportId)) return;
    const result = await getReport(reportId);
    if (!result) return Response.json({ error: "Report not found" });
    const reportDtoVar = await reportDto(result);
    console.log("🚀 ~ reportDto:", reportDtoVar);
    return Response.json({ result: reportDtoVar });
  } catch (error) {
    return Response.json({ error: "Failed getting report" });
  }
}
