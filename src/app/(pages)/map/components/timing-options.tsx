"use client";

import FormField from "@/components/form-field";
import { useFormik } from "formik";
import { timingSectionSchema } from "../schemas/timing-schema";

export interface TimingFields {
  generateMapAfter: number;
  resetSpecialsAfter: number;
}

export default function TimingOptions() {
  const formik = useFormik<TimingFields>({
    validationSchema: timingSectionSchema,
    initialValues: { generateMapAfter: 0, resetSpecialsAfter: 0 },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit } = formik;

  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField
        formik={formik}
        name="generateMapAfter"
        label="Generate map after X seconds"
        required
      />
      <FormField
        formik={formik}
        name="resetSpecialsAfter"
        label={`Reset "specials" after X seconds`}
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
