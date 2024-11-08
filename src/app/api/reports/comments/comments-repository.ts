import dbConnect from "@/database/db-connect";
import Comment, { CommentDocument } from "@/models/Comment";

export async function createNewComment(
  payload: Pick<
    CommentDocument,
    "parent" | "reportId" | "comment" | "commenterId"
  >
): Promise<any> {
  await dbConnect();
  return Comment.create(payload);
}

export async function getReportComments(reportId: string) {
  await dbConnect();
  return Comment.find({ reportId });
}
