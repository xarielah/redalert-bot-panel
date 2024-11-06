import { auth } from "@clerk/nextjs/server";
import { isValidObjectId } from "mongoose";
import { deleteTestById, getTestingById } from "../testings-repository";
import { emitTestAlerts } from "../testings-service";

// Retry alert
export async function POST(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    await auth.protect();
    const testId = (await params).testId;
    if (!isValidObjectId(testId)) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const alert = await getTestingById(testId);

    if (!alert) {
      return Response.json({ error: "Alert not found" }, { status: 404 });
    }

    // Reset alert proccessed flag
    alert.touched = false;
    await alert.save();

    // Emit
    await emitTestAlerts([alert]);

    return Response.json({ message: `Alert (id:${alert._id}) was re-emitted` });
  } catch (error) {
    return Response.json({ error: "Retry test request failed" });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
): Promise<Response> {
  try {
    await auth.protect();
    const testId = (await params).testId;
    if (!isValidObjectId(testId))
      return Response.json({ error: "Invalid request" }, { status: 400 });

    // Delete test
    const result = await deleteTestById(testId);

    return Response.json({ message: `Test (id:${result._id}) was delete` });
  } catch (error) {
    return Response.json({ error: "DELETE request failed" });
  }
}
