"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import { getThreatValue } from "../get-threat";
import { NewTestingPayload } from "./new-test-option";

interface ITestingStackRow {
  test: NewTestingPayload;
  removeTest: () => void;
}

export default function TestingStackRow({
  test,
  removeTest,
}: ITestingStackRow) {
  const values = useMemo(
    () => ({
      threat: getThreatValue(test.threat),
      time: new Date().toLocaleString("he-IL"),
      isDrill: test.isDrill ? "תרגיל" : "לא תרגיל",
      cities: test.cities,
    }),
    [test]
  );

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>{values.time}</CardTitle>
        <CardTitle>
          {values.threat} - {values.isDrill}
        </CardTitle>
        <CardDescription>{values.cities}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button size="sm" onClick={removeTest}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
