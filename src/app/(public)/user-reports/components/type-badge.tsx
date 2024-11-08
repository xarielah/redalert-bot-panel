import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReportTypes } from "@/models/report-types";

export default function TypeBadge({ type }: { type: ReportTypes }) {
  return (
    <Badge
      variant="secondary"
      className={cn("text-white capitalize text-[.7rem]", getTypeStyle(type))}
    >
      {type.toUpperCase()}
    </Badge>
  );
}

function getTypeStyle(type: ReportTypes) {
  const stdtype = type[0].toUpperCase() + type.slice(1).toLowerCase();
  switch (stdtype) {
    case ReportTypes.BUG:
      return "bg-red-700 hover:bg-red-700/90";
    case ReportTypes.ENHANCEMENT:
      return "bg-purple-600 hover:bg-purple-600/90";
    case ReportTypes.OTHER:
      return "bg-gray-600 hover:bg-gray-600/90";
    default:
      return "bg-gray-800";
  }
}
