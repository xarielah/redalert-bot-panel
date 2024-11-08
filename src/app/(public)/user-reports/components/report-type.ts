import { ClerkUser } from "@/lib/get-clerk-user";
import { ReportDocument } from "@/models/Report";

export type ReportDisplay = ReportDocument & {
  user: ClerkUser;
};
