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
      <div className="flex justify-between">
        <label htmlFor="cities">
          Comma separated cities <span className="text-red-400">*</span>
        </label>
        <textarea
          id="cities"
          className="form-input rtl text-right"
          dir="rtl"
          onChange={formik.handleChange}
          name="cities"
          rows={3}
          placeholder="עפולה, כרמיאל, קריית ביאליק וכו'..."
          required
        />
      </div>
      <FormField
        formik={formik}
        name="threat"
        label={`Threat classification`}
        required
      />
      <div className="flex items-center justify-between">
        <label htmlFor="isDrill">Is this a drill?</label>
        <select
          className="form-input"
          defaultValue="false"
          disabled={false}
          name="isDrill"
          id="isDrill"
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
