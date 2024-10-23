import * as yup from "yup";
import { type TimingFields } from "../components/timing-options";

enum ErrMessages {
  RANGE = "Value must be between 1 and 1000",
  REQUIRED = "This field is required",
  MUST_BE_NUMBER = "This field must be a number",
}

export const timingSectionSchema = yup.object<TimingFields>().shape({
  generateMapAfter: yup
    .number()
    .typeError(ErrMessages.MUST_BE_NUMBER)
    .required(ErrMessages.REQUIRED)
    .min(1, ErrMessages.RANGE)
    .max(1000, ErrMessages.RANGE),
  resetSpecialsAfter: yup
    .number()
    .typeError(ErrMessages.MUST_BE_NUMBER)
    .required(ErrMessages.REQUIRED)
    .min(1, ErrMessages.RANGE)
    .max(1000, ErrMessages.RANGE),
});
