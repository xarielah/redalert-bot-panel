import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReportStatuses } from "@/models/report-types";

export default function StatusBadge({ status }: { status: ReportStatuses }) {
  return (
    <Badge
      variant="secondary"
      className={cn("text-white text-[.7rem]", getStatusStyle(status))}
    >
      {status.toUpperCase()}
    </Badge>
  );
}

function getStatusStyle(status: ReportStatuses) {
  switch (status) {
    case ReportStatuses.NEW:
      return "bg-blue-600 hover:bg-blue-600/90";
    case ReportStatuses.IN_PROGRESS:
      return "bg-yellow-600 hover:bg-yellow-600/90";
    case ReportStatuses.DONE:
      return "bg-green-600 hover:bg-green-600/90";
    case ReportStatuses.DISUCSS:
      return "bg-brown-600 hover:bg-brown-600/90";
    case ReportStatuses.PREDEPLOY:
      return "bg-red-600 hover:bg-red-600/90";
    default:
      return "bg-gray-800 text-black";
  }
}
