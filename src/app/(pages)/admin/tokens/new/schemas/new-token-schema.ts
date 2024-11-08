import * as yup from "yup";

enum ErrMessages {
  RANGE = "Value must be between 1 and 1000",
  REQUIRED = "This field is required",
  MUST_BE_NUMBER = "This field must be a number",
  DATE_TOO_EARY = "Date must be in the future",
}

export const newTokenSchema = yup.object().shape({
  tokenName: yup.string().required(ErrMessages.REQUIRED),
  expiry: yup
    .date()
    .min(new Date(), ErrMessages.DATE_TOO_EARY)
    .required(ErrMessages.REQUIRED),
  ownerEmail: yup.string().optional().email("Invalid email"),
});
