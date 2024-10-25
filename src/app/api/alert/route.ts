import { auth } from "@clerk/nextjs/server";
import { AlertRouteActions } from "./enum";
import alertActionsHandler from "./handler";

export async function POST(req: Request) {
  await auth.protect();
  try {
    const body = await req.json();
    const action = body?.action;
    const payload = body?.payload;
    const validActions = Object.values(AlertRouteActions);
    if (!validActions.includes(action)) {
      return Response.json(
        { message: "Invalid action type." },
        { status: 400 }
      );
    }
    return alertActionsHandler(action, payload);
  } catch (error) {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }
}
