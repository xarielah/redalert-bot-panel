import mongoose from "mongoose";
import { ReportStatuses } from "./report-types";

export interface ReportDocument extends mongoose.Document {
  short_description: string;
  description: string;
  type: string;
  reporter: string;
  status: string;
  statuses: ReportStatus[];
  createdAt: string;
  active: boolean;
  updatedAt: string;
}

export type ReportStatus = {
  status: ReportStatuses;
  at: Date;
  by: string;
};

// Define the schema for statuses
const StatusSchema = new mongoose.Schema({
  status: { type: String, enum: Object.values(ReportStatuses), required: true },
  at: { type: Date, required: true },
  by: { type: String, required: true },
});

const ReportSchema = new mongoose.Schema<ReportDocument>(
  {
    short_description: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    statuses: [StatusSchema],
    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: Object.values(ReportStatuses),
      default: ReportStatuses.NEW,
    },
    reporter: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Report ||
  mongoose.model<ReportDocument>("Report", ReportSchema);
