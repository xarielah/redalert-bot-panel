"use client";

import { useLogPolling } from "@/app/api/logs/use-log-polling";
import AuthControl from "@/components/auth-control";
import ComponentLoading from "@/components/component-loading";
import { useState } from "react";
import LogTerminal from "./components/log-terminal";

enum FilterTypes {
  TODAY = "today",
  THREE_DAYS = "three-days",
  SEVEN_DAYS = "seven-days",
  CUSTOM = "custom",
}

export default function LogsPage() {
  const { logs, isPolling, isFirstLoad } = useLogPolling();
  const [filter, setFilter] = useState<string>(FilterTypes.TODAY);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilter(e.target.value);

  return (
    <AuthControl>
      {isPolling && (
        <div>
          <span>Fetching delta logs...</span>
        </div>
      )}
      <section className="page-spacing">
        <div className="space-y-2">
          <h1 className="page-title">Logs</h1>
          <p>
            Bot process logs, will be showing anything related to the bot
            process such as connecting to socket, whatsapp client, errors,
            etc...
          </p>
        </div>
        <hr />
        <div className="flex items-center gap-4">
          <label>
            <span>Filters:</span>
            <select className="px-2 py-1" onChange={handleChange}>
              <option value={FilterTypes.TODAY}>Today</option>
              <option value={FilterTypes.THREE_DAYS}>Last 3 days</option>
              <option value={FilterTypes.SEVEN_DAYS}>Last 7 days</option>
              <option value={FilterTypes.CUSTOM}>Custom Date</option>
            </select>
            <input type="date" />
            <button className="button">filter</button>
          </label>
        </div>
        {isFirstLoad ? <ComponentLoading /> : <LogTerminal logs={logs} />}
        <hr />
      </section>
    </AuthControl>
  );
}
