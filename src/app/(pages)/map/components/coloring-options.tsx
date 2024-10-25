"use client";

import { MapRouteActions } from "@/app/api/map/enum";
import ComponentLoading from "@/components/component-loading";
import FormField from "@/components/form-field";
import { MapColorTypes } from "@/models/map-color-types";
import { MapColorsDocument } from "@/models/MapColors";
import { useFormik } from "formik";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { coloringSectionSchema } from "../schemas/coloring-schema";

interface ColoringFields {
  normal: string;
  special: string;
}

async function fetcher(url: string) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      action: MapRouteActions.GET_COLORS,
    }),
  }).then((res) => res.json());
}

async function updateColors(
  url: string,
  { arg: payload }: { arg: ColoringFields }
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      action: MapRouteActions.UPDATE_COLORS,
      payload: payload,
    }),
  }).then((res) => res.json());
}

export default function ColoringOptions() {
  const { data, isLoading, error } = useSWR(MapRouteActions.GET_COLORS, () =>
    fetcher("/api/map")
  );

  const {
    trigger: sendUpdateColors,
    error: errorUpdateColors,
    isMutating,
  } = useSWRMutation("/api/map", updateColors);

  const formik = useFormik<ColoringFields>({
    validationSchema: coloringSectionSchema,
    initialValues: { normal: "", special: "" },
    onSubmit: async (values) => {
      const result = await sendUpdateColors(values);
      console.log("🚀 ~ onSubmit: ~ result:", result);
    },
  });

  useEffect(() => {
    const result = data?.result as MapColorsDocument[];
    if (result && Array.isArray(result)) {
      const validOptions = Object.values(MapColorTypes);
      const serverValues = result.reduce<any>((acc, color) => {
        if (!validOptions.includes(color.type)) return acc;
        acc[color.type] = color.color;
        return acc;
      }, {});
      setValues((prev) => ({ ...prev, ...serverValues } as ColoringFields));
    }
  }, [data, isLoading]);

  const { handleSubmit, setValues } = formik;

  if (isLoading || isMutating) return <ComponentLoading />;
  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField
        name="normal"
        formik={formik}
        label="Normal polygons color"
        required
      />
      <FormField
        name="special"
        formik={formik}
        label="Special polygons color"
        required
      />
      <div className="form-submit-wrap">
        <button type="submit" className="button mx-auto`">
          Save Changes
        </button>
      </div>
    </form>
  );
}
