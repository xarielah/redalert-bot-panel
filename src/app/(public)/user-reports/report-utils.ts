import { ClerkUser } from "@/lib/get-clerk-user";

export function getReportUserID(user: ClerkUser) {
  console.log("🚀 ~ getReportUserID ~ user:", user);
  if (!user.firstName || !user.lastName) return user.email;
  return `${user.firstName} ${user.lastName}`;
}
