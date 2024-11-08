"use client";
import { LogDocument } from "@/models/Log";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Cursors {
  next: string;
  prev: string;
}

export default function useLogPolling() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPrev, setIsLoadingPrev] = useState<boolean>(false);
  const logs = useRef<LogDocument[]>([]);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const isInitialized = useRef(false);
  const [prevCursor, setPrevCursor] = useState<string>(
    `/api/logs?prev=${Date.now()}&limit=100`
  );
  const cursors = useRef<Cursors>({
    next: "",
    prev: `/api/logs?prev=${Date.now()}&limit=100`,
  });

  const loadPrevious = useCallback(async () => {
    console.log("🚀 ~ loadPrevious ~ prevCursor:", prevCursor);
    try {
      if (isLoadingPrev || !prevCursor)
        return toast.error("Cannot load any more logs.");
      setIsLoadingPrev(true);
      const response = await fetcher(prevCursor);
      const tempLogs: LogDocument[] = [
        ...(response?.result || []),
        ...logs.current,
      ];
      const logIdSet = new Set<string>();
      const newLogs = tempLogs.reduce(
        (acc: LogDocument[], log: LogDocument) => {
          if (!logIdSet.has(log.id)) {
            logIdSet.add(log.id);
            acc.push(log);
          }
          return acc;
        },
        []
      );
      logs.current = newLogs;
      console.log("🚀 ~ loadPrevious ~ response?.prev:", response?.prev);
      if (response?.prev) {
        setPrevCursor(response.prev);
      } else if (response.result.length > 0) {
        setPrevCursor(`/api/logs?prev=${response.result[0].time}&limit=100`);
      }
    } catch (error) {
      console.error("Failed to fetch previous logs", error);
    } finally {
      setIsLoadingPrev(false);
    }
  }, [prevCursor]);

  const initializeLogs = useCallback(async () => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    return fetchLogs(prevCursor);
  }, []);

  const fetchLogs = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await fetcher(url);
      logs.current = [...(response?.result || []), ...logs.current];
      cursors.current.next = response?.next || cursors.current.next;
      setPrevCursor(response?.prev || "");
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      timer.current = setTimeout(() => {
        fetchLogs(cursors.current.next);
      }, 5000);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return {
    isLoading,
    logs: logs.current,
    initializeLogs,
    isLoadingPrev,
    loadPrevious,
  };
}
