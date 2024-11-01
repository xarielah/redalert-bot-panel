import { HTMLInputTypeAttribute } from "react";

interface IFormField {
  formik: any;
  name: string;
  label: string;
  min?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}

export default function FormField({
  formik,
  name,
  label,
  type,
  min,
  required = false,
}: IFormField) {
  const { handleChange, values, touched, errors } = formik;

  return (
    <div>
      <label className="form-label">
        <span>
          {label} {required && <span className="text-red-400">*</span>}
        </span>
        <input
          name={name}
          min={min}
          onChange={handleChange}
          value={values[name]}
          className="form-input"
          placeholder={label}
          type={type || "text"}
          size={Math.max(values[name]?.length || 0, 12)}
        />
      </label>
      {errors[name] && touched[name] ? (
        <span className="text-red-500">{errors[name]}</span>
      ) : null}
    </div>
  );
}
