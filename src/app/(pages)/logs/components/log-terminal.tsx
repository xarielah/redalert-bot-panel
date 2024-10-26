"use client";
import { LogDocument } from "@/models/Log";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import LogRow from "./log-row";

interface ILogTerminal {
  logs: LogDocument[];
}

export default function LogTerminal({ logs }: ILogTerminal) {
  const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(true);
  const [areNewLogs, setAreNewLogs] = useState<boolean>(false);
  const [buttonOpacity, setButtonOpacity] = useState<number>(0);
  const terminal = useRef<HTMLDivElement | null>(null);
  const prevLogsLength = useRef<number>(logs.length);

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
      setAreNewLogs(true);
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

  const handleScroll = (): void => {
    if (!terminal.current) return;

    const { scrollHeight, scrollTop, clientHeight } = terminal.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 350;

    setShouldAutoScroll(isNearBottom);

    // Smoothly update button opacity based on scroll position
    const newOpacity = isNearBottom ? 0 : 1;
    if (areNewLogs && newOpacity === 0) {
      setAreNewLogs(false);
    }
    setButtonOpacity(newOpacity);
  };

  const scrollToBottom = (): void => {
    if (!terminal.current) return;
    setShouldAutoScroll(true);
    terminal.current.scrollTo({
      top: terminal.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={terminal}
        onScroll={handleScroll}
        className="overflow-y-scroll h-[700px] bg-zinc-950 text-gray-100 p-4 rounded-xl shadow-lg"
      >
        {logs.map((log) => (
          <LogRow key={log.id} log={log} />
        ))}
      </div>

      <div
        className="absolute bottom-4 right-8 transition-opacity duration-300 ease-in-out z-[100]"
        style={{ opacity: buttonOpacity }}
      >
        <button
          onClick={scrollToBottom}
          className={`${
            buttonOpacity === 0 ? "hidden" : "flex"
          } items-center gap-2 rounded ease-in-out duration-100 ${
            areNewLogs
              ? "bg-green-500 hover:bg-green-400/90 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          } px-3 py-2 text-sm`}
          aria-label="Scroll to bottom"
        >
          <FaChevronDown />
          <span>{areNewLogs ? "New Logs" : "Scroll Down"}</span>
        </button>
      </div>
    </div>
  );
}
