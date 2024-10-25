import { MapColorTypes } from "@/models/map-color-types";
import isHEX from "@/utils/is-hex";
import { MapRouteActions } from "../enum";
import { getColors, updateColors } from "../map-repository";

interface IUpdateColorPayload {
  normal: string;
  special: string;
}

export async function handlerUpdateColors(payload: IUpdateColorPayload) {
  try {
    let result = [];
    const normal = payload?.normal;
    const special = payload?.special;

    if (!normal && !special) {
      return Response.json(
        { error: "Invalid color type, must be normal or special." },
        { status: 400 }
      );
    }

    if (normal) {
      if (!isHEX(normal))
        return Response.json(
          { error: "Normal color must be hex color (ex. #FF0000)." },
          { status: 400 }
        );
      const normalResult = await updateColors(MapColorTypes.NORMAL, normal);
      result.push(normalResult);
    }

    if (special) {
      if (!isHEX(special))
        return Response.json(
          { error: "Special color must be hex color (ex. #FF0000)." },
          { status: 400 }
        );
      const specialResult = await updateColors(MapColorTypes.SPECIAL, special);
      result.push(specialResult);
    }

    return Response.json({
      result: result.map((r) => ({
        type: r.type,
        color: r.color,
      })),
      action: MapRouteActions.UPDATE_COLORS,
    });
  } catch (error) {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }
}

export async function handlerGetColors() {
  const result = await getColors();
  return Response.json({
    result: result.map((r) => ({ type: r.type, color: r.color })),
    action: MapRouteActions.GET_COLORS,
  });
}