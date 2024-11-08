import { HTMLInputTypeAttribute } from "react";
import { Input } from "./ui/input";

interface IFormField {
  formik: any;
  name: string;
  label: string;
  min?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

export default function FormField({
  formik,
  name,
  label,
  type,
  min,
  readOnly = false,
  required = false,
  placeholder = label,
}: IFormField) {
  const { handleChange, values, touched, errors } = formik;

  return (
    <div>
      <label className="space-y-2">
        <div>
          {label} {required && <span className="text-red-400">*</span>}
        </div>
        <Input
          readOnly={readOnly}
          name={name}
          min={min}
          onChange={handleChange}
          value={values[name]}
          placeholder={placeholder}
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
