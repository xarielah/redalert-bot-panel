import { TestingDocument } from "@/models/Testing";

export async function emitTestAlerts(data: TestingDocument[]) {
  let payload: any[] = Array.isArray(data) ? data : [];
  payload = data.map((test) => ({
    type: "ALERT",
    data: {
      id: test._id,
      test: true,
      cities: test.cities.split(",").map((city: string) => city.trim()),
      isDrill: test.isDrill,
      threat: test.threat,
      notificationId: test.notificationId,
      time: test.time,
    },
  }));
  const response = await fetch(process.env.TESTING_SERVICE!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to emit test alert, status: ${response.status}`);
  }

  return response.json();
}
