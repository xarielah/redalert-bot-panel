"use client";
import AuthControl from "@/components/auth-control";
import { use } from "react";
import MainTokenContent from "./components/main-token-content";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ISpecificTokenPage {
  params: Promise<{ tokenId: string }>;
}

export default function SpecificTokenPage({ params }: ISpecificTokenPage) {
  const paramsResult = use(params);
  return (
    <AuthControl>
      <section className="page-spacing">
        <h1 className="page-title">View API Token</h1>
        <hr />

        <section className="page-section-spacing">
          <h2 className="page-section-title">Available Tokens</h2>
          <MainTokenContent tokenId={paramsResult.tokenId} />
        </section>
      </section>
    </AuthControl>
  );
}
