"use client";

import ComponentLoading from "@/components/component-loading";
import FormField from "@/components/form-field";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { newTokenSchema } from "../schemas/new-token-schema";

export interface NewTokenFields {
  tokenName: string;
  expiry: string;
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
  const { trigger: createNewApiToken, isMutating } = useSWRMutation(
    "/api/token",
    createNewToken
  );
  const formik = useFormik<NewTokenFields>({
    initialValues: {
      tokenName: "",
      expiry: "",
      ownerEmail: "",
    },
    validationSchema: newTokenSchema,
    onSubmit: async (values) => {
      console.log("🚀 ~ onSubmit: ~ values:", values);
      const data = await createNewApiToken({
        tokenName: values.tokenName.trim(),
        expiry: new Date(values.expiry).getTime().toString(),
        ownerEmail: values.ownerEmail?.trim(),
      });
      if (data?.result) {
        const newToken = data.result;
        router.push(`/tokens/${newToken.id || ""}`);
      }
    },
  });

  const { handleSubmit } = formik;

  const now = new Date();
  const tomorrow = new Date(now.setDate(now.getDate() + 1));
  const minDate = new Date(tomorrow).toISOString().slice(0, 16);

  if (isMutating) return <ComponentLoading />;
  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField name="tokenName" formik={formik} label="Token Name" required />
      <FormField
        name="expiry"
        type="datetime-local"
        min={minDate}
        formik={formik}
        label="Expiry Date"
        required
      />
      <FormField
        name="ownerEmail"
        formik={formik}
        label="Token Owner Email"
        type="email"
      />
      <div className="form-submit-wrap">
        <button type="submit" className="button mx-auto`">
          Save Changes
        </button>
      </div>
    </form>
  );
}
