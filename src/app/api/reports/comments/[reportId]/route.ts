import { isValidObjectId } from "mongoose";
import { getReport } from "../../reports-repository";
import { commentsDto } from "../comment-dto";
import { getReportComments } from "../comments-repository";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ reportId: string }> }
) {
  try {
    const { reportId } = await params;
    if (!isValidObjectId(reportId))
      return Response.json({ message: "Invalid report ID" }, { status: 400 });

    const report = await getReport(reportId);

    if (!report)
      return Response.json({ message: "Report not found." }, { status: 404 });

    const comments = await getReportComments(reportId);
    return Response.json({
      result: await commentsDto(comments),
      count: comments.length,
    });
  } catch (error) {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }
}
