"use client";

import AuthControl from "@/components/auth-control";
import { LogDocument } from "@/models/Log";
import { useEffect, useRef, useState } from "react";
import LogContainer from "./components/log-container";
import LogFilter from "./components/log-filter";
import LogPageHeader from "./components/log-page-header";
import { logsService } from "./logs-service";



export default function LogsPage() {
  const [cursor, setCursor] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [noMoreLogs, setNoMoreLogs] = useState<boolean>(false)
  const logs = useRef<LogDocument[]>([])

  // Initial load of logs
  useEffect(() => {
    loadLogs()
  }, [])

  const loadLogs = () => {
    setIsLoading(true)
    logsService.getLogs(cursor)
      .then((data) => {
        logs.current = [...data.result, ...logs.current];
        setCursor(data.result[0].id)
        if (data.count === 0)
          setNoMoreLogs(true)
      })
      .finally(() => setIsLoading(false))
  }

  const handleLoadMore = () => {
    loadLogs()
  }

  const handleFilterChange = (filter: string) => {
    console.log("Filter changed: " + filter);
  }

  return (
    <AuthControl>
      <section className="page-spacing">
        <LogPageHeader />
        <hr />
        <LogFilter onFilterChange={handleFilterChange} />
        <LogContainer logs={logs.current} forbidLoadMore={noMoreLogs} onLoadMore={handleLoadMore} isLoading={isLoading} />
        <hr />
      </section>
    </AuthControl>
  );
}
