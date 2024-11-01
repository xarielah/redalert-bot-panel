import { processTestAlert } from "../testings-repository";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("x-auth-token");
    if (!token || token !== process.env.LOGGING_SECRET)
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    const { notificationIds } = await req.json();
    if (Array.isArray(notificationIds)) {
      // Set for each testing alert it's touched value to true
      notificationIds.forEach(async (notificationId: string) => {
        await processTestAlert(notificationId);
      });
    }
    return Response.json({ message: "POST request" });
  } catch (error) {
    return Response.json({ message: "POST request" });
  }
}
