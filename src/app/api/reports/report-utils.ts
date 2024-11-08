import { ReportStatus } from "@/models/Report";
import { ReportStatuses } from "@/models/report-types";

export function getReportStatusSchema(
  status: ReportStatuses,
  by: string
): ReportStatus {
  return {
    status,
    at: new Date(),
    by: by,
  };
}
