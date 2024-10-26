import { getAllHeadings } from "@/app/api/alert/alert-repository";
import { getColors, getTimings } from "@/app/api/map/map-repository";
import { headingsDto } from "../alert/actions/headings";
import { timingsDto } from "../map/actions/timings";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("x-auth-token");
    if (!token || token !== process.env.LOGGING_SECRET)
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    const headings = await getAllHeadings();
    const mapTimings = await getTimings();
    const mapColors = await getColors();

    const headingsResult = headingsDto(headings).reduce<Record<string, string>>(
      (acc, curr: any) => {
        acc[curr.type] = curr.heading;
        return acc;
      },
      {}
    );

    const timingsResult = timingsDto(mapTimings).reduce<Record<string, string>>(
      (acc, curr: any) => {
        acc[curr.type] = curr.value;
        return acc;
      },
      {}
    );

    const colorsResult = mapColors.reduce<Record<string, string>>(
      (acc, curr: any) => {
        acc[curr.type] = curr.color;
        return acc;
      },
      {}
    );

    const configDto = {
      alert: {
        headings: headingsResult,
      },
      map: {
        timings: timingsResult,
        colors: colorsResult,
      },
    };

    return Response.json({ result: configDto });
  } catch (error) {
    return Response.json({ error: "GET request failed" });
  }
}
