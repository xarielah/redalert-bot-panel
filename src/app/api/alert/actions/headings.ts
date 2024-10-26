import { AlertHeadingTypes } from "@/models/alert-headings-types";
import { AlertHeadingDocument } from "@/models/AlertHeadings";
import { getAllHeadings, updateHeadings } from "../alert-repository";
import { AlertRouteActions } from "../enum";

interface IUpdateHeadingsPayload {
  [AlertHeadingTypes.DRILL_ALERT]?: string;
  [AlertHeadingTypes.DRONE_ALERT]?: string;
  [AlertHeadingTypes.EARTHQUAKE_ALERT]?: string;
  [AlertHeadingTypes.GENERAL_ALERT]?: string;
  [AlertHeadingTypes.HAZARD_ALERT]?: string;
  [AlertHeadingTypes.INVASION_ALERT]?: string;
  [AlertHeadingTypes.MISSILE_ALERT]?: string;
  [AlertHeadingTypes.RADIOACTIVE_ALERT]?: string;
  [AlertHeadingTypes.TSUNAMI_ALERT]?: string;
  [AlertHeadingTypes.UNCONVENTIONAL_ALERT]?: string;
}

export function headingsDto(result: AlertHeadingDocument[]) {
  if (!Array.isArray(result) || !result || result.length === 0) return [];
  return result.map((r) => ({
    type: r.type,
    heading: r.heading,
  }));
}

export async function handlerUpdateHeadings(payload: IUpdateHeadingsPayload) {
  const result = [];

  const validTypes = Object.values(AlertHeadingTypes);
  const payloadKeys = payload ? Object.keys(payload) : [];

  for (let i = 0; i < payloadKeys.length; i++) {
    if (!validTypes.includes(payloadKeys[i] as AlertHeadingTypes)) {
      return Response.json(
        { error: `Invalid alert type \"${payloadKeys[i]}\".` },
        { status: 400 }
      );
    }
  }
  for (const [type, heading] of Object.entries(payload)) {
    if (!heading) {
      return Response.json(
        { error: "Please provide a heading for all alert types." },
        { status: 400 }
      );
    }
    const headingResult = await updateHeadings(
      type as AlertHeadingTypes,
      heading
    );
    result.push(headingResult);
  }

  return Response.json({
    result: headingsDto(result),
    action: AlertRouteActions.UPDATE_HEADINGS,
  });
}

export async function handlerGetHeadings() {
  const result = await getAllHeadings();
  return Response.json({
    result: headingsDto(result),
    action: AlertRouteActions.GET_HEADINGS,
  });
}
