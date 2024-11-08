"use client";

import AuthControl from "@/components/auth-control";
import ComponentLoading from "@/components/component-loading";
import { LogDocument } from "@/models/Log";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import useSWR from "swr";

interface ISpecificLogPage {
  params: Promise<{ logId: string }>;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SpecificLogPage({ params }: ISpecificLogPage) {
  const [log, setLog] = useState<LogDocument>();
  const p = use(params);
  const { data, isLoading } = useSWR<{ result: LogDocument }>(
    `/api/logs/${p.logId}`,
    fetcher
  );

  useEffect(() => {
    if (data?.result) {
      setLog(data.result);
    }
  }, [data]);

  if (isLoading) return <ComponentLoading />;
  if (!p.logId) return notFound();
  if (!data) return notFound();

  return (
    <AuthControl>
      <section className="page-spacing">
        <h1 className="page-title">Log Details</h1>
        <hr />
        <section className="page-section-spacing">
          {log && (
            <>
              <h4 className="font-bold text-xl">Information:</h4>
              <div className="space-y-2">
                <p>
                  <span className="font-bold">Database ID:</span> {log.id}
                </p>
                <p>
                  <span className="font-bold">Level:</span> {log.level}
                </p>
                <p>
                  <span className="font-bold">Time:</span>{" "}
                  {new Date(log.time).toLocaleString()}
                </p>
                <p>
                  <span className="font-bold">Raw Time:</span> {log.time}
                </p>
                <p>
                  <span className="font-bold">Message:</span> {log.message}
                </p>
              </div>
              <h4 className="font-bold text-xl">Raw Database JSON:</h4>
              <div role="textbox" className="form-input whitespace-pre-wrap">
                {JSON.stringify(log, null, 2)}
              </div>
            </>
          )}
        </section>
      </section>
    </AuthControl>
  );
}
