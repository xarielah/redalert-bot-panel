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
import { ReportTypes } from "@/models/report-types";
import { useUser } from "@clerk/nextjs";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

interface NewReportFields {
  type: string;
  reporter: string;
  short_description: string;
  description: string;
}

const fetcher = (url: string, { arg: payload }: { arg: NewReportFields }) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export default function NewReport() {
  const { trigger: createReport, isMutating } = useSWRMutation(
    "/api/reports",
    fetcher
  );
  const { user, isLoaded } = useUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const textarea = useRef<HTMLTextAreaElement>(null);

  const formik = useFormik<NewReportFields>({
    initialValues: {
      type: ReportTypes.ENHANCEMENT.toLowerCase(),
      reporter: userEmail || "",
      short_description: "",
      description: "",
    },
    onSubmit: async (values) => {
      const res = await createReport({
        short_description: values.short_description.trim(),
        description: values.description.trim(),
        type: values.type,
        reporter: values.reporter,
      });
      const errors = res.errors;
      if (errors && Array.isArray(errors)) {
        toast.error(errors.join("\n"));
      } else if (!res?.result) {
        toast.error("Failed to submit report!");
      } else {
        toast.success("Report submitted successfully!");
        formik.resetForm();
        if (textarea.current) {
          textarea.current.style.height = "auto";
        }
      }
    },
  });

  useEffect(() => {
    if (userEmail) formik.setFieldValue("reporter", userEmail);
  }, [userEmail]);

  const { handleSubmit, setFieldValue } = formik;

  if (!isLoaded || isMutating) return <ComponentLoading />;
  return (
    <form className="form-spacing" onSubmit={handleSubmit}>
      <FormField
        formik={formik}
        name="reporter"
        label="Reporter"
        required
        readOnly
      />

      <div className="space-y-2">
        <label htmlFor="threat">
          Report type <span className="text-red-400">*</span>
        </label>
        <Select
          name="type"
          value={formik.values.type}
          onValueChange={(value) => setFieldValue("type", value.toLowerCase())}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="-- None --" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.values(ReportTypes).map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <FormField
        formik={formik}
        name="short_description"
        label="Short Description"
        placeholder="Briefly describe your report..."
        required
      />

      <div className="space-y-2">
        <label>
          Report Description <span className="text-red-400">*</span>
        </label>
        <Textarea
          required
          ref={textarea}
          id="description"
          name="description"
          className="min-h-[100px] overflow-hidden resize-none
          transition-all duration-200
          [&::-webkit-scrollbar]:hidden
          [&::-webkit-resizer]:hidden
          [-ms-overflow-style:'none']
          [scrollbar-width:'none']"
          placeholder="Describe the report in details..."
          value={formik.values.description}
          onChange={(e) => {
            formik.handleChange(e);
            if (!textarea.current) return;
            textarea.current.style.height = "auto";
            textarea.current.style.height = `${textarea.current?.scrollHeight}px`;
          }}
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <Button type="submit">Submit Report</Button>
      </div>
    </form>
  );
}
