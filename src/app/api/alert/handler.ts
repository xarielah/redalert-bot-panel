import { handlerGetHeadings, handlerUpdateHeadings } from "./actions/headings";
import { AlertRouteActions } from "./enum";

export default function alertActionsHandler(action: string, payload: any) {
  if (action === AlertRouteActions.UPDATE_HEADINGS) {
    return handlerUpdateHeadings(payload);
  } else if (action === AlertRouteActions.GET_HEADINGS) {
    return handlerGetHeadings();
  } else {
    return Response.json({ message: "Invalid action." }, { status: 400 });
  }
}
