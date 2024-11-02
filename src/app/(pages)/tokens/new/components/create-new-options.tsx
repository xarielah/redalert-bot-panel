"use client";

import ComponentLoading from "@/components/component-loading";
import FormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { PlusIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { newTokenSchema } from "../schemas/new-token-schema";

export interface NewTokenFields {
  tokenName: string;
  expiry: Date;
  ownerEmail: string;
}

async function createNewToken(
  url: string,
  { arg: payload }: { arg: NewTokenFields }
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

export default function CreateNewOptions() {
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const { trigger: createNewApiToken, isMutating } = useSWRMutation(
    "/api/token",
    createNewToken
  );

  useEffect(() => {
    formik.setValues({ ...formik.values, expiry: date });
  }, [date]);

  const formik = useFormik<NewTokenFields>({
    initialValues: {
      tokenName: "",
      expiry: new Date(),
      ownerEmail: "",
    },
    validationSchema: newTokenSchema,
    onSubmit: async (values) => {
      const data = await createNewApiToken({
        tokenName: values.tokenName.trim(),
        // Server expects to recieve a number
        expiry: new Date(values.expiry).getTime() as any,
        ownerEmail: values.ownerEmail?.trim(),
      });
      if (data?.result) {
        const newToken = data.result;
        router.push(`/tokens/${newToken.id || ""}`);
      }
    },
  });

  const { handleSubmit } = formik;

  if (isMutating) return <ComponentLoading />;
  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField name="tokenName" formik={formik} label="Token Name" required />
      <div className="w-full space-y-2 flex flex-col">
        <label>Expiry</label>
        <DatePicker date={date} setDate={setDate} className="w-full" />
        {formik.errors.expiry && formik.touched.expiry && (
          <span className="text-red-500">{formik.errors.expiry as any}</span>
        )}
      </div>
      <FormField
        name="ownerEmail"
        formik={formik}
        label="Token Owner Email"
        type="email"
      />
      <div className="form-submit-wrap">
        <Button type="submit" className="group">
          <PlusIcon className="group-hover:rotate-90 ease-in-out duration-300" />
          Create New
        </Button>
      </div>
    </form>
  );
}
