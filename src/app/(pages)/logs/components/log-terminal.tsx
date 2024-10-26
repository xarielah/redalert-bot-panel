import { LogDocument } from "@/models/Log";

interface ILogTerminal {
  logs: LogDocument[];
}

export default function LogTerminal({ logs }: ILogTerminal) {
  return (
    <div className="bg-zinc-950 text-gray-100 p-8 text-lg min-h-[450px] max-h-[450px] overflow-y-scroll h-auto">
      {logs.map((log) => (
        <span key={log.id!}>
          <span className="text-gray-400 mr-4">
            {new Date(log.time).toLocaleString("he-IL", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
          <span className="text-gray-200"> [{log.level}] </span>
          <span>{log.message}</span>
          <br />
        </span>
      ))}
    </div>
  );
}
