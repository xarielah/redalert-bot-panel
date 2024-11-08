import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReportStatuses, ReportTypes } from "@/models/report-types";
import moment from "moment";
import Link from "next/link";
import { memo } from "react";
import { getReportUserID } from "../report-utils";
import { ReportDisplay } from "./report-type";
import StatusBadge from "./status-badge";
import TypeBadge from "./type-badge";

interface IReportBlock {
  report: ReportDisplay;
}

export default memo(({ report }: IReportBlock) => {
  console.log("🚀 ~ memo ~ report:", report);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="flex capitalize items-center gap-2">
            <Link
              className="hover:underline"
              href={`/user-reports/${report.id}`}
            >
              {report.short_description}
            </Link>
          </CardTitle>
          <StatusBadge status={report.status as ReportStatuses} />
          <TypeBadge type={report.type as ReportTypes} />
        </div>
        <CardDescription>
          Reported by {getReportUserID(report.user)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {report.description.split("\n").map((p, i) => (
          <p key={i} className="capitalize">
            {p}
          </p>
        ))}
      </CardContent>
      <CardFooter>
        <span className="text-gray-500 text-sm">
          Created {moment(report.createdAt).fromNow()}, Last updated{" "}
          {moment(report.updatedAt).fromNow()}
        </span>
      </CardFooter>
    </Card>
  );
});
