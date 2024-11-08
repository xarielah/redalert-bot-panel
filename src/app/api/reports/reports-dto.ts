import { getClerkUser } from "@/lib/get-clerk-user";
import { ReportDocument, ReportStatus } from "@/models/Report";

export function reportsDto(reports: ReportDocument[]) {
  return new Promise(async (resolve, reject) => {
    const reportsDto = [];
    for (const report of reports) {
      const resutlReport = await reportDto(report);
      reportsDto.push(resutlReport);
    }
    resolve(reportsDto);
  });
}

export async function reportDto(report: ReportDocument) {
  const user = await getClerkUser(report.reporter);
  return {
    id: report.id,
    short_description: report.short_description,
    description: report.description,
    status: report.status,
    user: user,
    type: report.type,
    statuses: report.statuses.map((status: ReportStatus) => ({
      status: status.status,
      at: status.at,
      by: status.by,
    })),
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
  };
}
