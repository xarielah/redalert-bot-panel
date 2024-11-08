"use client";

import ComponentLoading from "@/components/component-loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReportDocument } from "@/models/Report";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import useSWR from "swr";
import ReportBlock from "./report-block";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReportsContainer() {
  const [filter, setFilter] = useState<string>("");
  const { data, isLoading } = useSWR("/api/reports", fetcher, {
    fallbackData: { result: [] },
  });

  const filteredData = useMemo(
    () =>
      data.result.filter((report: ReportDocument) =>
        filter
          ? report.short_description.indexOf(filter) > -1 ||
            report.description.indexOf(filter) > -1
          : true
      ),
    [filter, data]
  );

  if (isLoading) return <ComponentLoading />;
  if (!filteredData) return <></>;

  return (
    <div className="space-y-2">
      <div className="gap-4 flex items-center">
        <Input
          placeholder="Search a report by keywords..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Link href="/user-reports/new">
          <Button className="group">
            <PlusIcon className="group-hover:rotate-90 ease-in-out duration-300" />
            Add Report
          </Button>
        </Link>
      </div>
      {filteredData.length === 0 && (
        <div className="text-center p-4">
          <span className="mx-auto text-gray-500 text-sm">
            No data to display
          </span>
        </div>
      )}
      {filteredData.map((report: any, i: number) => (
        <ReportBlock report={report} key={i} />
      ))}
    </div>
  );
}
