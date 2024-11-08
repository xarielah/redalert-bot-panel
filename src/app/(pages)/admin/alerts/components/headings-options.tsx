"use client";

import { AlertRouteActions } from "@/app/api/alert/enum";
import ComponentLoading from "@/components/component-loading";
import FormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { AlertHeadingTypes } from "@/models/alert-headings-types";
import { AlertHeadingDocument } from "@/models/AlertHeadings";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { headingSchema } from "../schemas/heading-schema";

export interface HeadingFields {
  missile: string;
  drone: string;
  invasion: string;
  hazardous: string;
  earthquake: string;
  tsunami: string;
  radioactive: string;
  unconventional: string;
  general: string;
  drill: string;
}

const fetcher = (url: string) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      action: AlertRouteActions.GET_HEADINGS,
    }),
  }).then((res) => res.json());

const updateHeadings = (
  url: string,
  { arg: payload }: { arg: HeadingFields }
) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      action: AlertRouteActions.UPDATE_HEADINGS,
      payload: payload,
    }),
  }).then((res) => res.json());
};

export default function HeadingOptions() {
  const { data, isLoading, error } = useSWR(
    AlertRouteActions.GET_HEADINGS,
    () => fetcher("/api/alert")
  );

  const { trigger: sendUpdateHeadings, isMutating } = useSWRMutation(
    "/api/alert",
    updateHeadings
  );

  const formik = useFormik<HeadingFields>({
    validationSchema: headingSchema,
    initialValues: {
      missile: "",
      drone: "",
      invasion: "",
      hazardous: "",
      earthquake: "",
      tsunami: "",
      radioactive: "",
      unconventional: "",
      general: "",
      drill: "",
    },
    onSubmit: async (values) => {
      await sendUpdateHeadings(values).then(() =>
        toast.success("Headings updated successfully!")
      );
    },
  });

  useEffect(() => {
    const result = data?.result as AlertHeadingDocument[];
    if (result && Array.isArray(result)) {
      const validTypes = Object.values(AlertHeadingTypes);
      const serverValues = result.reduce<any>((acc, heading) => {
        if (!validTypes.includes(heading.type as AlertHeadingTypes)) return acc;
        acc[heading.type] = heading.heading;
        return acc;
      }, {});
      setValues((prev) => ({ ...prev, ...serverValues } as HeadingFields));
    }
  }, [data, isLoading]);

  const { handleSubmit, setValues } = formik;

  if (isLoading || isMutating) return <ComponentLoading />;
  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField
        name="missile"
        formik={formik}
        label={"Missile alert"}
        required
      />
      <FormField
        name="drone"
        formik={formik}
        label={"Hostile aircraft / drone alert"}
        required
      />
      <FormField
        name="invasion"
        formik={formik}
        label={"Terrorists invasion alert"}
        required
      />
      <FormField
        name="hazardous"
        formik={formik}
        label={"Hazardous materials alert"}
        required
      />
      <FormField
        name="earthquake"
        formik={formik}
        label={"Earthquake alert"}
        required
      />
      <FormField
        name="tsunami"
        formik={formik}
        label={"Tsunami alert"}
        required
      />
      <FormField
        name="radioactive"
        formik={formik}
        label={"Radioactive alert"}
        required
      />
      <FormField
        name="unconventional"
        formik={formik}
        label={"Unconventional explosives alert"}
        required
      />
      <FormField
        name="general"
        formik={formik}
        label={"Generic alert"}
        required
      />
      <FormField
        name="drill"
        formik={formik}
        label={"Pikud HaOref drill alert"}
        required
      />
      <div className="form-submit-wrap">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
