import * as yup from "yup";
import { type TimingFields } from "../components/timing-options";

enum ErrMessages {
  RANGE = "Value must be between 1 and 1000",
  REQUIRED = "This field is required",
  MUST_BE_STRING = "This field must be a string",
}

export const coloringSectionSchema = yup.object<TimingFields>().shape({
  normal: yup
    .string()
    .typeError(ErrMessages.MUST_BE_STRING)
    .required(ErrMessages.REQUIRED),
});
