"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IRedirectClient {
  url: string;
}

export default function RedirectClient({ url }: IRedirectClient) {
  const router = useRouter();
  useEffect(() => {
    router.replace("/logs");
  }, []);
  return <></>;
}
