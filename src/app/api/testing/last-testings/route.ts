import { auth } from "@clerk/nextjs/server";
import { testingDto } from "../testing-dto";
import { getLastTestings } from "../testings-repository";

export async function GET() {
  try {
    await auth.protect();
    const results = await getLastTestings();
    return Response.json({
      result: results.map((result) => testingDto(result)),
      message: "GET recent testing requests",
    });
  } catch (error) {
    return Response.json({ error: "Couldn't get last testings" });
  }
}
