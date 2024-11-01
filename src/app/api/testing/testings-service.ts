import { TestingDocument } from "@/models/Testing";

export async function emitTestAlert(data: TestingDocument) {
  let payload = [];
  if (Array.isArray(data)) {
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
  } else {
    payload = [
      {
        type: "ALERT",
        data: {
          test: true,
          id: data._id,
          cities: data.cities.split(",").map((city: string) => city.trim()),
          isDrill: data.isDrill,
          threat: data.threat,
          notificationId: data.notificationId,
          time: data.time,
        },
      },
    ];
  }
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
