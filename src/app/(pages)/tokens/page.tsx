"use client";

import AuthControl from "@/components/auth-control";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
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
            <Button className="group">
              <PlusIcon className="group-hover:rotate-90 ease-in-out duration-300" />{" "}
              Create New
            </Button>
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
