"use client";

import { useLogPolling } from "@/app/(pages)/logs/use-log-polling";
import AuthControl from "@/components/auth-control";
import ComponentLoading from "@/components/component-loading";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [date, setDate] = useState<Date>(new Date());

  const handleChange = (value: string) => setFilter(value);

  return (
    <AuthControl>
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
          <div>Filters:</div>
          <label>
            <Select onValueChange={handleChange} value={filter}>
              <SelectTrigger>
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={FilterTypes.TODAY}>Today</SelectItem>
                  <SelectItem value={FilterTypes.THREE_DAYS}>
                    Last 3 days
                  </SelectItem>
                  <SelectItem value={FilterTypes.SEVEN_DAYS}>
                    Last 7 days
                  </SelectItem>
                  <SelectItem value={FilterTypes.CUSTOM}>
                    Custom Date
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>
          {filter === FilterTypes.CUSTOM && (
            <DatePicker setDate={setDate} date={date} />
          )}
          <Button>Update Filters</Button>
        </div>
        {!isPolling && (
          <div>
            <span>Fetching delta logs...</span>
          </div>
        )}
        {isFirstLoad ? <ComponentLoading /> : <LogTerminal logs={logs} />}
        <hr />
      </section>
    </AuthControl>
  );
}
