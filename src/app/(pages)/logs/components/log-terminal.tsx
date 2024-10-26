"use client";
import { LogDocument } from "@/models/Log";
import { useEffect, useRef, useState } from "react";
import LogRow from "./log-row";

interface ILogTerminal {
  logs: LogDocument[];
}

export default function LogTerminal({ logs }: ILogTerminal) {
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const terminal = useRef<HTMLDivElement>(null);
  const prevLogsLength = useRef(logs.length);

  // Handle initial scroll and new logs
  useEffect(() => {
    if (!terminal.current) return;
    terminal.current.scrollTo({
      top: terminal.current.scrollHeight,
      behavior: "instant",
    });
  }, [terminal.current]);

  useEffect(() => {
    if (!terminal.current) return;

    // If new logs were added (not just initial load)
    if (logs.length > prevLogsLength.current) {
      const { scrollHeight, scrollTop, clientHeight } = terminal.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 350;

      // Only auto-scroll if user was already near bottom or auto-scroll is enabled
      if (shouldAutoScroll && isNearBottom) {
        terminal.current.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      }
    }

    prevLogsLength.current = logs.length;
  }, [logs, shouldAutoScroll]);

  // Handle scroll events to detect user scrolling up
  const handleScroll = () => {
    if (!terminal.current) return;

    const { scrollHeight, scrollTop, clientHeight } = terminal.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 350;

    setShouldAutoScroll(isNearBottom);
  };

  return (
    <div
      ref={terminal}
      onScroll={handleScroll}
      className="bg-zinc-950 text-gray-100 text-lg p-4 min-h-[450px] max-h-[700px] overflow-y-scroll scroll-smooth"
    >
      {logs.map((log) => (
        <LogRow key={log.id!} log={log} />
      ))}
    </div>
  );
}
