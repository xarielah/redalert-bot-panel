"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { forwardRef } from "react";
import LogRow from "./log-row";

interface ILogContainer {
  logs: any[];
  onLoadMore: () => void;
  isLoading: boolean;
  forbidLoadMore: boolean;
}

const LogContainer = forwardRef<HTMLDivElement, ILogContainer>(function LogContainer({ logs, onLoadMore, isLoading, forbidLoadMore }: ILogContainer, ref) {
  return (
    <section>
      <ScrollArea
        ref={ref}
        className="h-[700px] overflow-y-auto p-4 rounded-xl text-gray-300 font-mono bg-zinc-950"
      >
        {!forbidLoadMore &&
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={onLoadMore}
              disabled={isLoading}
              className="mx-auto"
            >
              {isLoading ? "Loading..." : "Load 20 More"}
            </Button>
          </div>
        }
        {!isLoading && logs.length === 0 && <div className="text-center mt-12 text-gray-400">No logs found</div>}
        {logs.length > 0 && logs.map((log) => (
          <LogRow log={log} key={log.id} />
        ))}
      </ScrollArea>
    </section>
  );
});


export default LogContainer;