"use client";

import ComponentLoading from "@/components/component-loading";
import FormField from "@/components/form-field";
import { TestingDocument } from "@/models/Testing";
import { useFormik } from "formik";
import useSWRMutation from "swr/mutation";

interface NewTestingPayload {
  cities: string;
  isDrill: boolean;
  threat: number;
}

const fetcher = (url: string, { arg: payload }: { arg: NewTestingPayload }) =>
  fetch(url, { method: "POST", body: JSON.stringify(payload) }).then((res) =>
    res.json()
  );

export default function NewTestOption() {
  const { trigger: createNewTest, isMutating } = useSWRMutation(
    "/api/testing",
    fetcher
  );

  const formik = useFormik<
    Pick<TestingDocument, "cities" | "isDrill" | "threat">
  >({
    initialValues: {
      cities: "",
      isDrill: false,
      threat: 0,
    },
    onSubmit: async (values) => {
      const newTestingPayload: NewTestingPayload = {
        cities: values.cities.trim(),
        isDrill: values.isDrill.toString() === "true" ? true : false,
        threat: parseInt(values.threat.toString()),
      };
      const result = await createNewTest(newTestingPayload);
      console.log("🚀 ~ onSubmit: ~ result:", result);
    },
  });

  const { handleSubmit } = formik;

  if (isMutating) return <ComponentLoading />;

  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField
        formik={formik}
        name="cities"
        label="Comma separated cities"
        required
      />
      <FormField
        formik={formik}
        name="threat"
        label={`Threat classification`}
        required
      />
      <div className="flex items-center justify-between">
        <label>Is this a drill?</label>
        <select
          className="form-input"
          defaultValue="false"
          disabled={false}
          name="isDrill"
          onChange={formik.handleChange}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
      <div className="form-submit-wrap">
        <button type="submit" className="button mx-auto`">
          Submit Test
        </button>
      </div>
    </form>
  );
}
