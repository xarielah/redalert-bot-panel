import * as yup from "yup";

enum ErrMessages {
  RANGE = "Value must be between 1 and 1000",
  REQUIRED = "This field is required",
  MUST_BE_NUMBER = "This field must be a number",
}

export const newTokenSchema = yup.object().shape({
  tokenName: yup.string().required(ErrMessages.REQUIRED),
  expiry: yup.date().required(ErrMessages.REQUIRED),
  ownerEmail: yup.string().optional().email("Invalid email"),
});
