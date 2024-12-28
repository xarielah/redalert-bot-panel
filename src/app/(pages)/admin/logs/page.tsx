"use client";

import AuthControl from "@/components/auth-control";
import { LogDocument } from "@/models/Log";
import { useEffect, useRef, useState } from "react";
import LogContainer from "./components/log-container";
import LogFilter from "./components/log-filter";
import LogPageHeader from "./components/log-page-header";
import { FilterTypes, logsService } from "./logs-service";



export default function LogsPage() {
  const [startDate, setStartDate] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [noMoreLogs, setNoMoreLogs] = useState<boolean>(false)
  const [logs, setLogs] = useState<LogDocument[]>([])

  const nextCursor = useRef<string>('');
  const cursor = useRef<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startDate && !cursor.current)
      setLogs([]);
    loadLogs()
  }, [startDate])

  useEffect(() => {
    if (startDate) return;
    const to = setInterval(() => {
      if (nextCursor.current) {
        loadNewLogs(nextCursor.current)
      }
    }, 10 * 1000)
    return () => clearInterval(to)
  }, [nextCursor.current])

  function loadNewLogs(cursor: string) {
    logsService.getLogs(cursor, true)
      .then((data) => {
        setLogs(logs => [...logs, ...data.result]);

        if (data.count > 0) {
          nextCursor.current = data.result[data.result.length - 1].id;
        }
      })
  }

  function loadLogs() {
    setIsLoading(true)

    let promise;

    // Choosing which method to use to fetch logs
    if (startDate && !cursor.current)
      promise = logsService.getLogsByDate(startDate)
    else
      promise = logsService.getLogs(cursor.current)

    promise.then((data) => {
      // Add new logs to the beginning of the list
      setLogs(logs => [...data.result, ...logs]);

      // Update pointers
      nextCursor.current = data.result[data.result.length - 1].id;
      cursor.current = data.result[0].id;

      // If we're keep fetching prev logs and got nothing, meaning we've reached the end
      if (data.count === 0)
        setNoMoreLogs(true)
    })
      .finally(() => setIsLoading(false))
  }

  function handleFilterSearch(filter: FilterTypes | string) {
    setLogs([]);
    cursor.current = '';
    const date = logsService.getDateFromFilter(filter as FilterTypes)
    setStartDate(date ? date : undefined)
  }

  function handleLoadMore() {
    loadLogs()
  }

  return (
    <AuthControl>
      <section className="page-spacing">
        <LogPageHeader />
        <hr />
        <LogFilter onFilterSearch={handleFilterSearch} />
        <LogContainer
          ref={containerRef}
          logs={logs}
          forbidLoadMore={noMoreLogs}
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
        <hr />
      </section>
    </AuthControl>
  );
}
