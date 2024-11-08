import { clerkClient } from "@clerk/nextjs/server";

export interface ClerkUser {
  id: string;
  firstName?: string;
  lastName?: string;
  img: string;
  email: string;
}

export async function getClerkUser(id: string): Promise<ClerkUser | null> {
  const c = await clerkClient();
  const user = await c.users.getUser(id);
  return {
    id: user.id,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    img: user.imageUrl,
    email: user.emailAddresses[0].emailAddress,
  };
}
