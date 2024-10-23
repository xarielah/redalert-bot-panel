"use client";

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

  const { handleSubmit, handleChange, errors, touched, values } = formik;

  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <div>
        <label className="form-label">
          Generate map after X seconds
          <input
            name="generateMapAfter"
            onChange={handleChange}
            value={values.generateMapAfter}
            className="form-input"
          />
        </label>
        {errors.generateMapAfter && touched.generateMapAfter ? (
          <span className="text-red-500">{errors.generateMapAfter}</span>
        ) : null}
      </div>
      <div>
        <label className="form-label">
          Reset "specials" after X seconds
          <input
            name="resetSpecialsAfter"
            onChange={handleChange}
            value={values.resetSpecialsAfter}
            className="form-input"
          />
        </label>
        {errors.resetSpecialsAfter && touched.resetSpecialsAfter ? (
          <span className="text-red-500">{errors.resetSpecialsAfter}</span>
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
