import { MapTimingsTypes } from "@/models/MapTimings";
import { MapRouteActions } from "../enum";
import { getTimings, updateTimings } from "../map-repository";

interface IUpdateTimingsPayload {
  [MapTimingsTypes.MAP_GENERATION]: number;
  [MapTimingsTypes.RESET_SPECIAL_CACHE]: number;
}

export async function handlerUpdateTimings(payload: IUpdateTimingsPayload) {
  try {
    let result = [];

    const mapGeneration = payload?.[MapTimingsTypes.MAP_GENERATION];
    const resetSpecialCache = payload?.[MapTimingsTypes.RESET_SPECIAL_CACHE];

    if (!mapGeneration && !resetSpecialCache) {
      return Response.json(
        { message: "Invalid timing type." },
        { status: 400 }
      );
    }

    if (mapGeneration) {
      if (typeof mapGeneration !== "number") {
        return Response.json(
          { message: "Map generation timing must be a number." },
          { status: 400 }
        );
      }
      const mapGenerationResult = await updateTimings(
        MapTimingsTypes.MAP_GENERATION,
        mapGeneration
      );
      result.push(mapGenerationResult);
    }

    if (resetSpecialCache) {
      if (typeof resetSpecialCache !== "number") {
        return Response.json(
          { message: "Reset special cache timing must be a number." },
          { status: 400 }
        );
      }
      const resetSpecialCacheResult = await updateTimings(
        MapTimingsTypes.RESET_SPECIAL_CACHE,
        resetSpecialCache
      );
      result.push(resetSpecialCacheResult);
    }

    return Response.json({
      result: result.map((r) => ({
        type: r.type,
        value: r.value,
      })),
      action: MapRouteActions.UPDATE_TIMINGS,
    });
  } catch (error) {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }
}

export async function handlerGetTimings() {
  const result = await getTimings();
  return Response.json({
    results: result,
    action: MapRouteActions.GET_TIMINGS,
  });
}
