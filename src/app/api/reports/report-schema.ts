import { ReportTypes } from "@/models/report-types";
import * as yup from "yup";

export const reportValidationSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(
      Object.values(ReportTypes).map((r) => r.toLowerCase()),
      "Invalid report type."
    )
    .required("Report type is a required field."),
  description: yup
    .string()
    .required("Description is a required field.")
    .min(8, "Description must be at least 8 characters.")
    .max(1024, "Description must be less than 1024 characters."),
  short_description: yup
    .string()
    .required("Short description is a required field.")
    .min(8, "Short description must be at least 8 characters.")
    .max(255, "Short description must be less than 255 characters."),
});
