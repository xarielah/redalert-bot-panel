"use client";

import ComponentLoading from "@/components/component-loading";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { TestingDocument } from "@/models/Testing";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { ClockIcon } from "@radix-ui/react-icons";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
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
    await resendTestAlert().then(() =>
      toast.success("Test was resent to the bot successfully!")
    );
  };

  const deleteRow = async () => {
    await deleteTestAlert(test.id)
      .then(() => deleteOne(test.id))
      .then(() => toast.success(`Test ${test.id} deleted successfully!`));
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
    <Card className="p-6 shadow-md rounded-lg">
      <CardTitle className="flex items-center gap-2">
        <div
          className={
            (test.touched ? "bg-cyan-500" : "bg-red-500") +
            " text-white w-full font-bold rounded-md py-2 px-6"
          }
        >
          {test.touched ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Done Processing
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ClockIcon />
              Pending
            </span>
          )}
        </div>
        <Button size="sm" onClick={sendAgain}>
          Resend
        </Button>
        {!test.touched && (
          <DeleteAlertDialog action={deleteRow}>
            <Button size="sm" variant="destructive">
              Del
            </Button>
          </DeleteAlertDialog>
        )}
      </CardTitle>
      <div className="flex items-center gap-2 mb-3"></div>
      <article>
        {fields.map((field) => (
          <div key={field} className="my-2">
            <span className="capitalize font-bold">{field}</span>:{" "}
            {test[field as keyof TestingDocument]}
          </div>
        ))}
      </article>
    </Card>
  );
}

interface IDeleteAlertDialog {
  action: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

function DeleteAlertDialog({
  action,
  children,
  title = "Are you sure you want to delete it?",
  description = "This action is irreverseable and cannot be undone.",
}: IDeleteAlertDialog) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={action}>
            <Button variant="destructive">Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
