"use client";

import ComponentLoading from "@/components/component-loading";
import usePolling from "@/hooks/use-polling";
import { TestingDocument } from "@/models/Testing";
import NoData from "./nodata-row";
import TestingRow from "./testing-row";

interface LastTestingsResult {
  result: TestingDocument[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LastTestings() {
  const { data, isLoading } = usePolling<LastTestingsResult>({
    url: "/api/testing/last-testings",
    interval: 3 * 1000,
  });

  if (isLoading) return <ComponentLoading />;
  if (!data || !data.result || data.result.length === 0) return <NoData />;
  let { result: alerts } = data;

  const deleteOne = (id: string) => {
    alerts = alerts.filter((alert) => alert.id !== id);
  };

  return (
    <section className="space-y-6">
      {alerts.map((test) => (
        <TestingRow deleteOne={deleteOne} test={test} key={test.id} />
      ))}
    </section>
  );
}
