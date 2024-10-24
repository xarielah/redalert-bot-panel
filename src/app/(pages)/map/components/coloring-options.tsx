"use client";

import FormField from "@/components/form-field";
import { useFormik } from "formik";
import { coloringSectionSchema } from "../schemas/coloring-schema";

interface ColoringFields {
  normal: string;
  special: string;
}

export default function ColoringOptions() {
  const formik = useFormik<ColoringFields>({
    validationSchema: coloringSectionSchema,
    initialValues: { normal: "", special: "" },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit } = formik;

  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField
        name="normal"
        formik={formik}
        label="Normal polygons color"
        required
      />
      <FormField
        name="special"
        formik={formik}
        label="Special polygons color"
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
