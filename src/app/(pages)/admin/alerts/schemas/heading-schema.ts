import * as yup from "yup";
import { type HeadingFields } from "../components/headings-options";

enum ErrMessages {
  RANGE = "Value must be between 1 and 256",
  REQUIRED = "This field is required",
  MUST_BE_STRING = "This field must be a string",
}

export const headingSchema = yup.object<HeadingFields>().shape({
  missile: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
  invasion: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
  drone: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
  earthquake: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
  hazardous: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
  tsunami: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
  radioactive: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
  unconventional: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
  general: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
  drill: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
});
