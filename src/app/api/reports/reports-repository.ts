import dbConnect from "@/database/db-connect";
import Report, { ReportDocument } from "@/models/Report";
import { ReportStatuses } from "@/models/report-types";
import { getReportStatusSchema } from "./report-utils";

export async function getReports() {
  await dbConnect();
  return Report.find({ active: true }).sort({ createdAt: -1 });
}

export async function createNewReport({
  short_description,
  description,
  type,
  reporter,
}: Pick<
  ReportDocument,
  "short_description" | "description" | "type" | "reporter"
>) {
  await dbConnect();
  const statusHistory = getReportStatusSchema(ReportStatuses.NEW, reporter);
  return Report.create({
    short_description,
    description,
    type,
    reporter,
    statuses: [statusHistory],
  });
}

export async function getReport(
  reportId: string
): Promise<ReportDocument | null> {
  await dbConnect();
  return Report.findById(reportId);
}
