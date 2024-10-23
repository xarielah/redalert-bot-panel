"use client";

import { useFormik } from "formik";
import { headingSchema } from "../schemas/heading-schema";

export interface HeadingFields {
  missile: string;
  drone: string;
}

export default function HeadingOptions() {
  const formik = useFormik<HeadingFields>({
    validationSchema: headingSchema,
    initialValues: { missile: "", drone: "" },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, handleChange, errors, touched, values } = formik;

  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <div>
        <label className="form-label">
          Generate map after X seconds
          <input
            name="missile"
            onChange={handleChange}
            value={values.missile}
            className="form-input"
          />
        </label>
        {errors.missile && touched.missile ? (
          <span className="text-red-500">{errors.missile}</span>
        ) : null}
      </div>
      <div>
        <label className="form-label">
          Reset "specials" after X seconds
          <input
            name="drone"
            onChange={handleChange}
            value={values.drone}
            className="form-input"
          />
        </label>
        {errors.drone && touched.drone ? (
          <span className="text-red-500">{errors.drone}</span>
        ) : null}
      </div>
      <div className="form-submit-wrap">
        <button type="submit" className="button mx-auto`">
          Save Changes
        </button>
      </div>
    </form>
  );
}
