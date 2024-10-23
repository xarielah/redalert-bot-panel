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
    .required(ErrMessages.REQUIRED)
    .min(1, ErrMessages.RANGE)
    .max(256, ErrMessages.RANGE),
  drone: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED)
    .min(1, ErrMessages.RANGE)
    .max(256, ErrMessages.RANGE),
});
