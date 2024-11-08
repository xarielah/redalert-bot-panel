import { TestingDocument } from "@/models/Testing";
import * as yup from "yup";

enum ErrMessages {
  RANGE = "Value must be between 1 and 1000",
  REQUIRED = "This field is required",
  MUST_BE_STRING = "This field must be a string",
}

export const coloringSectionSchema = yup
  .object<Pick<TestingDocument, "isDrill" | "threat" | "cities">>()
  .shape({
    cities: yup
      .string()
      .typeError(ErrMessages.MUST_BE_STRING)
      .required(ErrMessages.REQUIRED),
    isDrill: yup
      .string()
      .typeError(ErrMessages.MUST_BE_STRING)
      .required(ErrMessages.REQUIRED),
    threat: yup
      .number()
      .typeError(ErrMessages.MUST_BE_STRING)
      .required(ErrMessages.REQUIRED)
      .min(0, ErrMessages.RANGE)
      .max(9, ErrMessages.RANGE),
  });
