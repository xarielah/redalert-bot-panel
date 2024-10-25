import { MapRouteActions } from "@/app/api/map/enum";

export async function apiGetMapColors() {
  return fetch("/api/map", {
    body: JSON.stringify({
      actions: MapRouteActions.GET_COLORS,
    }),
  }).then((res) => res.json());
}
