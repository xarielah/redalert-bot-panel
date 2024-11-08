"use client";

import ComponentLoading from "@/components/component-loading";
import useSWR from "swr";
import ReportComment from "./report-comment";

interface ICommentsContainer {
  reportId: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CommentsContainer({ reportId }: ICommentsContainer) {
  const { data, isLoading } = useSWR(
    `/api/reports/comments/${reportId}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return <ComponentLoading />;
  const comments = data?.result || [];
  console.log("🚀 ~ CommentsContainer ~ comments:", comments);

  if (comments.length === 0)
    return (
      <div>
        {comments.length === 0 && (
          <div>
            <span className="mx-auto text-gray-500 text-sm">
              No comments to display
            </span>
          </div>
        )}
      </div>
    );
  return (
    <section className="space-y-7">
      {comments.map((comment: any) => (
        <ReportComment comment={comment} key={comment.id} />
      ))}
    </section>
  );
}
