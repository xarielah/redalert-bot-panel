"use client";

import ComponentLoading from "@/components/component-loading";
import { TokenDocument } from "@/models/Token";
import { useEffect, useState } from "react";
import useSWR from "swr";
import TokenRow from "./token-row";

interface TokensResponse {
  result: TokenDocument[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TokensList() {
  const { data, isLoading } = useSWR<TokensResponse>("/api/token", fetcher);
  const [tokens, setTokens] = useState<TokenDocument[]>([]);

  useEffect(() => {
    if (data && data.result) {
      setTokens(data.result);
    }
  }, [data]);

  if (isLoading) return <ComponentLoading />;
  if (!tokens || tokens.length === 0) return <p>No tokens found</p>;
  return (
    <table className="w-full rounded-md bg-gray-50 shadow-lg">
      <thead>
        <tr className="text-left">
          <th>Name</th>
          <th>Token</th>
          <th>Owner</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <TokenRow key={token.id} token={token} />
        ))}
      </tbody>
    </table>
  );
}
