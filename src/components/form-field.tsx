interface IFormField {
  formik: any; // formik doesn't have a specific type
  name: string;
  label: string;
  required?: boolean;
}

export default function FormField({
  formik,
  name,
  label,
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
          onChange={handleChange}
          value={values[name]}
          className="form-input"
          placeholder={label}
        />
      </label>
      {errors[name] && touched[name] ? (
        <span className="text-red-500">{errors[name]}</span>
      ) : null}
    </div>
  );
}
