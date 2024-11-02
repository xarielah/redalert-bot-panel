"use client";

import ComponentLoading from "@/components/component-loading";
import FormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TestingDocument } from "@/models/Testing";
import {} from "@radix-ui/react-select";
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
    },
  });

  const { handleSubmit } = formik;

  if (isMutating) return <ComponentLoading />;

  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="cities">
          Comma separated cities <span className="text-red-400">*</span>
        </label>
        <Textarea
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
      <div className="space-y-2">
        <label htmlFor="isDrill">Is this a drill?</label>
        <Select
          defaultValue="false"
          name="isDrill"
          onValueChange={formik.handleChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="-- None --" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="form-submit-wrap">
        <Button type="submit">Send Test</Button>
      </div>
    </form>
  );
}
