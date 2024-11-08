import { MapRouteActions } from "./enum";
import { mapActionsHandler } from "./handler";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body.action;
    const payload = body.payload;
    const validActions = Object.values(MapRouteActions);
    if (!validActions.includes(action)) {
      return Response.json({ message: "Invalid request." }, { status: 400 });
    }
    return mapActionsHandler(action, payload);
  } catch (error) {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }
}
