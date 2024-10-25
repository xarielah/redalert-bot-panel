"use client";

import { MapRouteActions } from "@/app/api/map/enum";
import ComponentLoading from "@/components/component-loading";
import FormField from "@/components/form-field";
import { MapTimingsTypes } from "@/models/map-timing-types";
import { MapTimingsDocument } from "@/models/MapTimings";
import { useFormik } from "formik";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { timingSectionSchema } from "../schemas/timing-schema";

export interface TimingFields {
  map_generation: number;
  reset_special_cache: number;
}

const fetcher = (url: string) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      action: MapRouteActions.GET_TIMINGS,
    }),
  }).then((res) => res.json());

const updateTimings = async (
  url: string,
  { arg: payload }: { arg: TimingFields }
) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      action: MapRouteActions.UPDATE_TIMINGS,
      payload: payload,
    }),
  }).then((res) => res.json());
};

export default function TimingOptions() {
  const { data, isLoading, error } = useSWR(MapRouteActions.GET_TIMINGS, () =>
    fetcher("/api/map")
  );
  const { trigger: sendUpdateTimings, isMutating } = useSWRMutation(
    "/api/map",
    updateTimings
  );

  const formik = useFormik<TimingFields>({
    validationSchema: timingSectionSchema,
    initialValues: { map_generation: 0, reset_special_cache: 0 },
    onSubmit: async (values) => {
      console.log(values);
      await sendUpdateTimings(values);
    },
  });

  useEffect(() => {
    const result = data?.result as MapTimingsDocument[];
    if (result && Array.isArray(result)) {
      const validOptions = Object.values(MapTimingsTypes);
      const serverValues = result.reduce<any>((acc, timing) => {
        if (!validOptions.includes(timing.type)) return acc;
        acc[timing.type] = timing.value;
        return acc;
      }, {});
      setValues((prev) => ({ ...prev, ...serverValues } as TimingFields));
    }
  }, [data, isLoading]);

  const { handleSubmit, setValues } = formik;
  console.log(formik.errors);

  if (isLoading || isMutating) return <ComponentLoading />;
  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField
        formik={formik}
        name="map_generation"
        label="Generate map after X seconds"
        required
      />
      <FormField
        formik={formik}
        name="reset_special_cache"
        label={`Reset "specials" after X seconds`}
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
