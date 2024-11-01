"use client";

import ComponentLoading from "@/components/component-loading";
import { TestingDocument } from "@/models/Testing";
import useSWRMutation from "swr/mutation";

interface ITestingRow {
  test: TestingDocument;
  deleteOne: (id: string) => void;
}

const fetcher = (url: string) =>
  fetch(url, { method: "POST" }).then((res) => res.json());

const deleteRowFetcher = (
  url: string,
  {
    arg: payload,
  }: { arg: Pick<TestingDocument, "cities" | "isDrill" | "threat"> }
) =>
  fetch(url, { method: "DELETE", body: JSON.stringify(payload) }).then((res) =>
    res.json()
  );

export default function TestingRow({ test, deleteOne }: ITestingRow) {
  const { trigger: resendTestAlert, isMutating } = useSWRMutation(
    `/api/testing/${test.id}`,
    fetcher
  );

  const { trigger: deleteTestAlert, isMutating: isDeleting } = useSWRMutation(
    `/api/testing/${test.id}`,
    deleteRowFetcher
  );

  const sendAgain = async () => {
    await resendTestAlert();
  };

  const deleteRow = async () => {
    await deleteTestAlert(test.id).then(() => deleteOne(test.id));
  };

  const fields = [
    "cities",
    "isDrill",
    "threat",
    "time",
    "createdAt",
    "updatedAt",
  ];

  if (isMutating || isDeleting) return <ComponentLoading />;

  return (
    <div className="p-6 shadow-md rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <div
          className={
            (test.touched ? "bg-cyan-500" : "bg-red-500") +
            " text-white w-full font-bold rounded-md py-1 text-lg px-6"
          }
        >
          {test.touched ? "Emitted" : "Pending"}
        </div>
        <button className="button" onClick={sendAgain}>
          Send Again
        </button>
        {!test.touched && (
          <button className="button danger" onClick={deleteRow}>
            Delete Row
          </button>
        )}
      </div>
      <article>
        {fields.map((field) => (
          <div key={field} className="my-2">
            <span className="capitalize font-bold">{field}</span>:{" "}
            {test[field as keyof TestingDocument]}
          </div>
        ))}
      </article>
    </div>
  );
}
