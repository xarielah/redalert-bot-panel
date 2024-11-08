"use client";

import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";

export default function useUserRole() {
  const { isLoaded, isSignedIn, user } = useUser();
  const userRole = useMemo(() => user?.publicMetadata?.role, [user]);
  const isAdmin = useMemo(() => userRole === "admin", [userRole]);
  return { isLoaded, isSignedIn, userRole, isAdmin };
}
