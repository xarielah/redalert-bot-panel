"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import useLogPolling from "../use-log-polling";
import LogRow from "./log-row";

export default function LogContainer() {
  const { logs, initializeLogs, loadPrevious, isLoading, isLoadingPrev } =
    useLogPolling();
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeLogs();
  }, []);

  return (
    <section>
      <ScrollArea
        ref={viewRef}
        className="h-[700px] overflow-y-auto p-4 rounded-xl text-gray-300 font-mono bg-zinc-950"
      >
        <div className="w-full flex items-center justify-center">
          {!isLoadingPrev && (
            <Button
              onClick={loadPrevious}
              disabled={isLoadingPrev}
              className="mx-auto"
            >
              Load Previous
            </Button>
          )}
        </div>
        {logs.map((log) => (
          <LogRow log={log} key={log.id} />
        ))}
      </ScrollArea>
    </section>
  );
}
