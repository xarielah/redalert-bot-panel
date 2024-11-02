"use client";

import ComponentLoading from "@/components/component-loading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TokenDocument } from "@/models/Token";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

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
    <>
      <Table>
        <TableCaption>All available tokens list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Token Name</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
            <TableRow key={token.id}>
              <TableCell>
                <Link href={`/tokens/${token.id}`} className="hover:underline">
                  {token.tokenName}
                </Link>
              </TableCell>
              <TableCell>
                <code>{token.token}</code>
              </TableCell>
              <TableCell>{token.ownerEmail || "Not Available"}</TableCell>
              <TableCell>{token.createdAt}</TableCell>
              <TableCell>
                <Trash2Icon className="w-4 h-4 text-red-600" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
