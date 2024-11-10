import { auth, currentUser } from "@clerk/nextjs/server";
import { getReport } from "../reports-repository";
import { commentDto } from "./comment-dto";
import { commentValidationSchema } from "./comment-schema";
import { createNewComment } from "./comments-repository";

type ValidationPayload<T> =
  | {
      errors?: never;
    }
  | T;

export async function POST(req: Request) {
  try {
    await auth.protect();
    const body = await req.json();
    const result: any = await commentValidationSchema
      .validate(body)
      .then((res) => res)
      .catch((err) => ({ errors: err.errors }));
    const errors = (result as any).errors;
    // Validation errors
    if (errors) {
      return Response.json({ errors: errors }, { status: 400 });
    }

    const report = await getReport(result.reportId);

    if (!report) {
      return Response.json({ message: "Report not found." }, { status: 404 });
    }

    // Extract comment initiator
    const user = await currentUser();
    console.log("🚀 ~ POST ~ user:", user?.id);

    const newComment = await createNewComment({
      reportId: result.reportId as any,
      comment: result.comment,
      commenterId: user!.id,
      parent: (result.parent || undefined) as any,
    });

    if (!newComment)
      return Response.json(
        { message: "Failed to create comment." },
        { status: 500 }
      );

    return Response.json({ result: await commentDto(newComment) });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error.message);
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }
}
