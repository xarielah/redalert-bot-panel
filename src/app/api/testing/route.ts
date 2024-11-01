import { TestingDocument } from "@/models/Testing";
import { auth } from "@clerk/nextjs/server";
import {
  createNewTestAlert,
  getPendingTestings,
  touchTestAlert,
} from "./testings-repository";

function cleanUpAlerts(alerts: TestingDocument[]) {
  console.log(new Date().toISOString() + " - cleaning up alerts");
  console.log(new Date().toISOString() + " - cleaning up alerts");
  setTimeout(() => {
    alerts.forEach((alert) => {
      touchTestAlert(alert._id + "");
    });
    console.log(new Date().toISOString() + " - DONE!! cleaning up alerts");
  }, 2000);
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get("x-auth-token");
    if (!token || token !== process.env.LOGGING_SECRET)
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    const result = await getPendingTestings();
    const pendingResult = result.map((test) => ({
      type: "ALERT",
      data: {
        id: test._id,
        cities: test.cities.split(",").map((city: string) => city.trim()),
        isDrill: test.isDrill,
        threat: test.threat,
        notificationId: test.notificationId,
        time: test.time,
      },
    }));
    console.log(new Date().toISOString() + ` - found ${result.length} alerts`);
    cleanUpAlerts(result);
    return Response.json(pendingResult);
  } catch (error) {
    return Response.json({ error: "GET request failed" });
  }
}

export async function POST(req: Request) {
  try {
    await auth.protect();
    const body = await req.json();
    const newTestDto: Pick<TestingDocument, "cities" | "isDrill" | "threat"> = {
      cities: body.cities || "",
      isDrill: body.isDrill || false,
      threat: body.threat || 0,
    };

    const testResult = await createNewTestAlert(newTestDto);
    return Response.json({
      result: testingDto(testResult),
      message: "New test alert created",
    });
  } catch (error: any) {
    return Response.json({ error: "Couldn't create new test alert" });
  }
}

function testingDto(test: TestingDocument) {
  return {
    id: test._id,
    cities: test.cities,
    isDrill: test.isDrill,
    threat: test.threat,
    notificationId: test.notificationId,
    time: test.time,
  };
}
