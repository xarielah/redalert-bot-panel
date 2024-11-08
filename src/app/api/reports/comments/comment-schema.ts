import * as yup from "yup";

export interface NewCommentPayload {
  reportId: string;
  comment: string;
  parent?: yup.Maybe<string | undefined>;
}

export const commentValidationSchema = yup.object().shape({
  comment: yup.string().required("Comment is required"),
  reportId: yup.string().required("Report ID is required"),
  parent: yup.string().notRequired(),
});
