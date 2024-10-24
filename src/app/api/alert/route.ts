import alertActionsHandler from "./handler";

export async function POST(req: Request) {
  const body = await req.json();
  const action = body.action;
  const payload = body.payload;
  if (!action || !payload) {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }
  return alertActionsHandler(action, payload);
}
