"use client";

import AuthControl from "@/components/auth-control";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LogContainer from "./components/log-container";

enum FilterTypes {
  TODAY = "today",
  THREE_DAYS = "three-days",
  SEVEN_DAYS = "seven-days",
  CUSTOM = "custom",
}

export default function LogsPage() {
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
            <Select>
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
        </div>
        <LogContainer />
        <hr />
      </section>
    </AuthControl>
  );
}
