"use client";
import AuthControl from "@/components/auth-control";
import Link from "next/link";
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
        <h1 className="page-title">
          API Token - {paramsResult.tokenId.slice(18)}
        </h1>
        <hr />

        <div>
          <Link href="/tokens/new">
            <button className="button danger">Delete Token</button>
          </Link>
        </div>

        <section className="page-section-spacing">
          <h2 className="page-section-title">Available Tokens</h2>
          <MainTokenContent tokenId={paramsResult.tokenId} />
        </section>
      </section>
    </AuthControl>
  );
}
