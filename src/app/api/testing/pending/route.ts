import { auth } from "@clerk/nextjs/server";
import { testingDto } from "../testing-dto";
import { getPendingTestings } from "../testings-repository";

export async function GET() {
  try {
    await auth.protect();
    const result = await getPendingTestings();
    return Response.json({
      result: result.map((test) => testingDto(test)),
      message: "GET recent testing requests",
    });
  } catch (error) {
    return Response.json({ error: "Couldn't get last testings" });
  }
}
