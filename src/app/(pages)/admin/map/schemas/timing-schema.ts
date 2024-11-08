import * as yup from "yup";

enum ErrMessages {
  RANGE = "Value must be between 1 and 1000",
  REQUIRED = "This field is required",
  MUST_BE_NUMBER = "This field must be a number",
}

export const timingSectionSchema = yup.object().shape({
  map_generation: yup
    .string()
    .matches(/^\d+$/, "Must be a number")
    .required(ErrMessages.REQUIRED)
    .min(1, ErrMessages.RANGE)
    .max(1000, ErrMessages.RANGE),
  reset_special_cache: yup
    .string()
    .matches(/^\d+$/, "Must be a number")
    .required(ErrMessages.REQUIRED)
    .min(1, ErrMessages.RANGE)
    .max(1000, ErrMessages.RANGE),
});
