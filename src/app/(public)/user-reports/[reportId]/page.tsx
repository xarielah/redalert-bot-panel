"use client";
import ComponentLoading from "@/components/component-loading";
import { ReportDocument } from "@/models/Report";
import { ReportStatuses, ReportTypes } from "@/models/report-types";
import { notFound } from "next/navigation";
import { use } from "react";
import useSWR from "swr";
import StatusBadge from "../components/status-badge";
import TypeBadge from "../components/type-badge";
import AddComment from "./component/add-comment";
import CommentsContainer from "./component/comments-container";

interface ReportAPIResponse {
  result: ReportDocument;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = use(params);
  const { data, isLoading } = useSWR<ReportAPIResponse>(
    `/api/reports/${reportId}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return <ComponentLoading />;
  if (!data?.result) return notFound();

  const report = data?.result;

  return (
    <section className="page-spacing">
      <header className="flex justify-center gap-2 flex-col">
        <article className="flex items-center gap-2">
          <h1 className="page-title mr-2 capitalize">
            {report.short_description}
          </h1>
          <StatusBadge status={report.status as ReportStatuses} />
          <TypeBadge type={report.type as ReportTypes} />
        </article>
        <span className="text-gray-500">Reported by {report.reporter}</span>
      </header>
      {report.description.split("\n").map((p, i) => (
        <p key={i} className="capitalize">
          {p}
        </p>
      ))}
      <hr />
      <section className="page-section-spacing">
        <AddComment reportId={reportId} />
        <CommentsContainer reportId={reportId} />
      </section>
    </section>
  );
}
