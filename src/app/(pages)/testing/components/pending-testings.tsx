"use client";

import ComponentLoading from "@/components/component-loading";
import usePolling from "@/hooks/use-polling";
import { TestingDocument } from "@/models/Testing";
import { useEffect, useState } from "react";
import NoData from "./nodata-row";
import TestingRow from "./testing-row";

interface PendingTestingsResult {
  result: TestingDocument[];
}

export default function PendingTestings() {
  const [alerts, setAlerts] = useState<TestingDocument[]>([]);
  const { data, isLoading } = usePolling<PendingTestingsResult>({
    url: "/api/testing/pending",
    interval: 3 * 1000,
  });

  useEffect(() => {
    if (data) {
      setAlerts(data.result);
    }
  }, [data]);

  if (isLoading) return <ComponentLoading />;
  if (!data || !data.result || data.result.length === 0) return <NoData />;

  const deleteOne = (id: string) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
  };

  return (
    <section className="space-y-6">
      {alerts.map((test) => (
        <TestingRow deleteOne={deleteOne} test={test} key={test.id} />
      ))}
    </section>
  );
}
