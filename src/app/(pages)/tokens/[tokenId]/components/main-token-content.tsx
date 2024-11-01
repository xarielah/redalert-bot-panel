"use client";

import ComponentLoading from "@/components/component-loading";
import FormField from "@/components/form-field";
import { useFormik } from "formik";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface IMainTokenContent {
  tokenId: string;
}

interface UpdateTokenPayload {
  tokenName: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const updateTokenFetchher = async (
  url: string,
  { arg: { payload } }: { arg: { payload: UpdateTokenPayload } }
) =>
  fetch(`/api/token`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tokenName: payload.tokenName,
    }),
  }).then((res) => res.json());

export default function MainTokenContent({ tokenId }: IMainTokenContent) {
  const { data, isLoading } = useSWR(`/api/token/${tokenId}`, fetcher);
  const { trigger: updateToken, isMutating: isUpdating } = useSWRMutation(
    `/api/token/${tokenId}`,
    updateTokenFetchher
  );

  const formik = useFormik<{ tokenName: string }>({
    initialValues: {
      tokenName: "",
    },
    onSubmit: async (values) => {
      console.log("🚀 ~ formik.onSubmit ~ values", values);
      await updateToken({ payload: values });
    },
  });

  const { handleSubmit, setValues } = formik;

  useEffect(() => {
    if (data) {
      setValues({
        tokenName: data.result.tokenName,
      });
    }
  }, [data]);

  if (isLoading || isUpdating) return <ComponentLoading />;
  if (!data) return notFound();

  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField
        name="tokenName"
        formik={formik}
        label={"Token Name"}
        required
      />
      <div className="flex justify-between items-center">
        <label>Expiry</label>
        <input
          readOnly
          className="form-input"
          defaultValue={new Date(data.result.expiry).toLocaleString()}
        />
      </div>

      <div className="flex justify-between items-center">
        <label>Token</label>
        <input
          readOnly
          name="token"
          size={data.result.token.length + 1}
          className="form-input"
          defaultValue={data.result.token}
        />
      </div>

      <div className="form-submit-wrap">
        <button type="submit" className="button mx-auto`">
          Save Changes
        </button>
      </div>
    </form>
  );
}
