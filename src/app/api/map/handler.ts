import { handlerGetColors, handlerUpdateColors } from "./actions/colors";
import { handlerGetTimings, handlerUpdateTimings } from "./actions/timings";
import { MapRouteActions } from "./enum";

export function mapActionsHandler(action: string, payload: any) {
  if (action === MapRouteActions.UPDATE_COLORS) {
    return handlerUpdateColors(payload);
  } else if (action === MapRouteActions.UPDATE_TIMINGS) {
    return handlerUpdateTimings(payload);
  } else if (action === MapRouteActions.GET_COLORS) {
    return handlerGetColors();
  } else if (action === MapRouteActions.GET_TIMINGS) {
    return handlerGetTimings();
  } else {
    return Response.json({ message: "Invalid action." }, { status: 400 });
  }
}
