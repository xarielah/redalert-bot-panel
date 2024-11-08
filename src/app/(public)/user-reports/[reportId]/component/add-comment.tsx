import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { useRef } from "react";
import useSWRMutation from "swr/mutation";

interface IAddComment {
  reportId: string;
}

interface NewCommentPayload {
  reportId: string;
  comment: string;
}

const fetcher = (url: string, { arg: payload }: { arg: NewCommentPayload }) =>
  fetch(url, { method: "POST", body: JSON.stringify(payload) }).then((res) =>
    res.json()
  );

export default function AddComment({ reportId }: IAddComment) {
  const { trigger: submitComment, isMutating } = useSWRMutation(
    "/api/reports/comments",
    fetcher
  );

  const formik = useFormik<{ comment: string }>({
    initialValues: {
      comment: "",
    },
    onSubmit: async (values) => {
      const res = await submitComment({
        comment: values.comment,
        reportId: reportId,
      });
    },
  });

  const { handleChange, handleSubmit } = formik;

  const textarea = useRef<HTMLTextAreaElement>(null);
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Textarea
        ref={textarea}
        placeholder="Add a comment"
        className="min-h-[85px]"
        value={formik.values.comment}
        name="comment"
        onChange={(e) => {
          handleChange(e);
          if (textarea.current) {
            textarea.current.style.height = "auto";
            textarea.current.style.height = `${textarea.current.scrollHeight}px`;
          }
        }}
        minLength={8}
      />
      <Button
        className="w-max self-end"
        disabled={
          isMutating ||
          !formik.values.comment ||
          formik.values.comment.length < 8
        }
      >
        Submit your comment
      </Button>
    </form>
  );
}
