import ShowTooltip from "@/components/show-tooltip";
import { LogDocument } from "@/models/Log";
import moment from "moment";
import { memo } from "react";

interface ILogRow {
  log: LogDocument;
}

export default memo(({ log }: ILogRow) => {
  return (
    <div key={log.id} className="px-4 py-2 hover:bg-zinc-800 mx-2 rounded-md">
      <span>
        <ShowTooltip value={moment(log.time).fromNow().toString()}>
          <span>
            {moment(log.time).format("YYYY-MM-DD HH:mm:ss").toString()}
          </span>
        </ShowTooltip>
      </span>
      <span className={`px-4 w-[30ch] ${getLevelColor(log.level)}`}>
        [{log.level.toUpperCase()}]
      </span>
      <span>{log.message}</span>
    </div>
  );
});

function getLevelColor(value: string) {
  switch (value) {
    case "info":
      return "text-cyan-700";
    case "warn":
      return "text-yellow-400";
    case "error":
      return "text-red-500";
    default:
      return "text-gray-400";
  }
}
