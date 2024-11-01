"use client";

import { LogDocument } from "@/models/Log";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Custom hook for log polling
export function useLogPolling(pollInterval = 5000) {
  const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);
  const [logs, setLogs] = useState<LogDocument[]>([]);

  // Construct the URL based on whether we have a lastTimestamp
  const getUrl = () => {
    if (lastTimestamp === null) {
      return "/api/logs";
    }
    return `/api/logs?from=${lastTimestamp}`;
  };

  const { data, error, isLoading } = useSWR<LogDocument[]>(getUrl(), fetcher, {
    refreshInterval: pollInterval,
    revalidateOnFocus: false, // Prevent revalidation on window focus
    dedupingInterval: pollInterval, // Prevent duplicate requests
  });

  // Handle data updates using useEffect
  useEffect(() => {
    const dataLogs = (data as any)?.result || [];
    if (dataLogs && dataLogs.length > 0) {
      // Sort the data
      const sortedData = [...dataLogs].sort((a, b) => a.time - b.time);

      // Update logs
      if (lastTimestamp === null) {
        // First load - replace all logs
        setLogs(sortedData);
      } else {
        // Subsequent loads - append new logs
        const newLogs = sortedData.filter((log) => log.time > lastTimestamp);
        setLogs((prevLogs) => [...prevLogs, ...newLogs]);
      }

      // Update timestamp from the latest log
      const latestTimestamp = sortedData[sortedData.length - 1]?.time;
      if (latestTimestamp) {
        setLastTimestamp(latestTimestamp);
      }
    }
  }, [data]);

  return {
    logs,
    error,
    isPolling: isLoading,
    isFirstLoad: !lastTimestamp && isLoading,
    lastTimestamp,
  };
}
