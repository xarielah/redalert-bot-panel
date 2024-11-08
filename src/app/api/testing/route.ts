import { NewTestingPayload } from "@/app/(pages)/admin/testing/components/new-test-option";
import { TestingDocument } from "@/models/Testing";
import { testingDto } from "./testing-dto";
import {
  CreateMultipleTests,
  createNewTestAlerts,
  getPendingTestings,
  touchTestAlert,
} from "./testings-repository";
import { emitTestAlerts } from "./testings-service";

// This function allow us to return the user with a value and not
// wait for the cleanup to finish
function cleanUpAlerts(alerts: TestingDocument[]) {
  console.log(new Date().toISOString() + " - cleaning up alerts");
  setTimeout(() => {
    alerts.forEach((alert) => {
      touchTestAlert(alert.id);
    });
    console.log(new Date().toISOString() + " - DONE!! cleaning up alerts");
  }, 1000);
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
    const body = await req.json();
    const testsArr: NewTestingPayload[] = Array.isArray(body) ? body : [];
    const newTestDto: CreateMultipleTests[] = testsArr.map((test) => ({
      cities: test.cities
        .split(",")
        .map((city: string) => city.trim())
        .join(","),
      isDrill: test.isDrill,
      threat: test.threat,
      time: new Date().getTime(),
      notificationId: crypto.randomUUID(),
    }));

    const testResult = await createNewTestAlerts(newTestDto);

    // Emit
    await emitTestAlerts(testResult);

    return Response.json({
      result: testResult.map((test) => testingDto(test)),
      message: "New tests alerts created",
    });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json({ error: "Couldn't create new test alert" });
  }
}
