import { ClerkUser } from "@/lib/get-clerk-user";

export function getReportUserID(user: ClerkUser) {
  const { firstName, lastName } = user;
  if (firstName && lastName) return `${firstName} ${lastName}`;
  return user.email;
}
