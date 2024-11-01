"use client";

import ComponentLoading from "@/components/component-loading";
import { TestingDocument } from "@/models/Testing";
import useSWR from "swr";

interface LastTestingsResult {
  result: TestingDocument[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LastTestings() {
  const { data, isLoading } = useSWR<LastTestingsResult>(
    "/api/testing/last-testings",
    fetcher
  );
  if (isLoading) return <ComponentLoading />;
  if (!data || !data.result || data.result.length === 0) return <NoData />;
  return <>asd</>;
}

function NoData() {
  return (
    <div className="text-center">
      <span className="mx-auto text-gray-500">No last testings to display</span>
    </div>
  );
}
