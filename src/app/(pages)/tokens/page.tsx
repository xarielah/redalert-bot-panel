"use client";

import AuthControl from "@/components/auth-control";
import Link from "next/link";
import TokensList from "./components/tokens-list";

export default function TokensPage() {
  return (
    <AuthControl>
      <section className="page-spacing">
        <h1 className="page-title">API Tokens</h1>
        <hr />

        <div>
          <Link href="/tokens/new">
            <button className="button">Create New</button>
          </Link>
        </div>

        <section className="page-section-spacing">
          <h2 className="page-section-title">Available Tokens</h2>
          <TokensList />
        </section>
      </section>
    </AuthControl>
  );
}
