import { auth, currentUser } from "@clerk/nextjs/server";
import { reportValidationSchema } from "./report-schema";
import { reportDto, reportsDto } from "./reports-dto";
import { createNewReport, getReports } from "./reports-repository";

export async function GET(req: Request) {
  try {
    const result = await getReports();
    return Response.json({ result: await reportsDto(result) });
  } catch (error) {
    return Response.json({ error: "Failed getting reports" });
  }
}

export async function POST(req: Request) {
  try {
    await auth.protect();
    const body = await req.json();
    const result: any = await reportValidationSchema
      .validate({
        short_description: body.short_description,
        description: body.description,
        type: body.type,
        reporter: body.reporter,
      })
      .then((res) => res)
      .catch((err) => ({ errors: err.errors }));

    if (result.errors) {
      return Response.json({ errors: result.errors }, { status: 400 });
    }

    const user = await currentUser();
    const userId = user!.id;

    const newReport = await createNewReport({
      short_description: body.short_description,
      description: body.description,
      type: body.type,
      reporter: userId,
    });

    return Response.json({ result: reportDto(newReport) }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
}
