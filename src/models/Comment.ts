import mongoose from "mongoose";

export interface CommentDocument extends mongoose.Document {
  reportId: mongoose.Schema.Types.ObjectId;
  comment: string;
  commenterId: string;
  parent: mongoose.Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const CommentSchema = new mongoose.Schema<CommentDocument>(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },
    comment: { type: String, required: true },
    commenterId: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model<CommentDocument>("Comment", CommentSchema);
