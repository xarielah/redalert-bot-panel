"use client";

import threats from "@/app/(pages)/testing/threats.json";
import ComponentLoading from "@/components/component-loading";
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
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import TestingStackRow from "./testing-stack";

export type NewTestingPayload = Pick<
  TestingDocument,
  "cities" | "isDrill" | "threat"
> & { testId: string };

const fetcher = (url: string, { arg: payload }: { arg: NewTestingPayload[] }) =>
  fetch(url, { method: "POST", body: JSON.stringify(payload) }).then((res) =>
    res.json()
  );

export default function NewTestOption() {
  const [testStacks, setTestStacks] = useState<NewTestingPayload[]>([]);
  const { trigger: createNewTests, isMutating } = useSWRMutation(
    "/api/testing",
    fetcher
  );

  const formik = useFormik<NewTestingPayload>({
    initialValues: {
      testId: "",
      cities: "",
      isDrill: false,
      threat: 0,
    },
    onSubmit: async () => {
      const values = structuredClone(formik.values);
      values.testId = crypto.randomUUID();
      const oldValues = structuredClone(testStacks);
      oldValues.unshift(values);
      setTestStacks(() => oldValues);
      formik.setValues({
        testId: "",
        cities: "",
        isDrill: false,
        threat: 0,
      });
    },
  });

  const submitTests = async () => {
    const newTestingPayload: NewTestingPayload[] = testStacks.map((test) => ({
      testId: crypto.randomUUID(),
      cities: test.cities.trim(),
      isDrill: test.isDrill.toString() === "true" ? true : false,
      threat: parseInt(test.threat.toString()),
    }));
    await createNewTests(newTestingPayload)
      .then((res) => {
        if (!res.error) {
          const result = res?.result;
          if (result) {
            toast.success(`${result.length} Tests emitted successfully!`);
          }
          setTestStacks([]);
        } else {
          toast.error(res.error);
        }
      })
      .catch(() => toast.error("Unexpected error occurred!"))
      .finally(() => formik.resetForm());
  };

  const removeTest = (testId: string) => {
    setTestStacks((tests) => tests.filter((test) => test.testId !== testId));
  };

  const { handleSubmit } = formik;

  if (isMutating) return <ComponentLoading />;

  return (
    <>
      <form className="form-spacing" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="cities">
            Comma separated cities <span className="text-red-400">*</span>
          </label>
          <Textarea
            id="cities"
            className="form-input rtl text-right"
            dir="rtl"
            value={formik.values.cities}
            onChange={formik.handleChange}
            name="cities"
            rows={3}
            placeholder="עפולה, כרמיאל, קריית ביאליק וכו'..."
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="threat">
            Threat Type <span className="text-red-400">*</span>
          </label>
          <Select
            defaultValue="0"
            name="threat"
            value={formik.values.threat.toString()}
            onValueChange={(value) => formik.setFieldValue("threat", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="-- None --" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {threats.map((threat) => (
                  <SelectItem
                    key={threat.value}
                    value={threat.value.toString()}
                  >
                    {threat.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="isDrill">Is this a drill?</label>
          <Select
            defaultValue="false"
            name="isDrill"
            value={formik.values.isDrill.toString()}
            onValueChange={(value) => formik.setFieldValue("isDrill", value)}
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
        <div className="form-submit-wrap space-x-2">
          {testStacks.length > 0 && (
            <Button type="button" onClick={submitTests}>
              Submit Tests
            </Button>
          )}
          <Button type="submit" className="bg-cyan-500 hover:bg-cyan-500/90">
            Add Test
          </Button>
        </div>
      </form>
      {testStacks.length > 0 &&
        testStacks.map((test) => (
          <TestingStackRow
            key={test.testId}
            removeTest={() => removeTest(test.testId)}
            test={test}
          />
        ))}
    </>
  );
}
