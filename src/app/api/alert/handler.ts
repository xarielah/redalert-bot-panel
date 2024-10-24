import { updateHeadings } from "./actions/headings";
import { AlertRouteActions } from "./enum";

export default function alertActionsHandler(action: string, payload: any) {
  if (action === AlertRouteActions.UPDATE_HEADINGS) {
    return updateHeadings(payload);
  } else {
    return Response.json({ message: "Invalid action." }, { status: 400 });
  }
}
