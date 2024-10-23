"use client";

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

  const { handleSubmit, handleChange, errors, touched, values } = formik;

  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <div>
        <label className="form-label">
          Normal polygons color
          <input
            name="normal"
            onChange={handleChange}
            value={values.normal}
            className="form-input"
          />
        </label>
        {errors.normal && touched.normal ? (
          <span className="text-red-500">{errors.normal}</span>
        ) : null}
      </div>
      <div>
        <label className="form-label">
          Special polygons color
          <input
            name="special"
            onChange={handleChange}
            value={values.special}
            className="form-input"
          />
        </label>
        {errors.special && touched.special ? (
          <span className="text-red-500">{errors.special}</span>
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
