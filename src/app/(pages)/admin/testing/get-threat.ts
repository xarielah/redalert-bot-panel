import threats from "@/app/(pages)/admin/testing/threats.json";

export function getThreatValue(id: number | string) {
  return threats.find((t) => t.value == id)?.label;
}
