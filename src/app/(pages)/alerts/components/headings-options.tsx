"use client";

import FormField from "@/components/form-field";
import { useFormik } from "formik";
import { headingSchema } from "../schemas/heading-schema";

export interface HeadingFields {
  missile: string;
  drone: string;
  invasion: string;
  hazardous: string;
  earthquake: string;
  tsunami: string;
  radioactive: string;
  unconvetional: string;
  alert: string;
  drill: string;
}

export default function HeadingOptions() {
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
      unconvetional: "",
      alert: "",
      drill: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit } = formik;

  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField
        name="missile"
        formik={formik}
        label={"Missle alert"}
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
        name="unconvetional"
        formik={formik}
        label={"Unconvetional explosives alert"}
        required
      />
      <FormField
        name="alert"
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
        <button type="submit" className="button mx-auto`">
          Save Changes
        </button>
      </div>
    </form>
  );
}
