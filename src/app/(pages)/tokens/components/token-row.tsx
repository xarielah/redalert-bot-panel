"use client";

import { TokenDocument } from "@/models/Token";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface ITokenRow {
  token: TokenDocument;
}

export default function TokenRow({ token }: ITokenRow) {
  const [tokenHidden, setTokenHidden] = useState<boolean>(true);

  const toggleTokenVisibility = () => setTokenHidden(!tokenHidden);

  return (
    <tr key={token.id} className="p-5">
      <td>
        <Link href={`/tokens/${token.id}`}>{token.tokenName}</Link>
      </td>
      <td className="flex items-center gap-3 justify-start text-gray-400">
        <input
          type="password"
          hidden={!tokenHidden}
          defaultValue={token.token}
          className="w-[35ch] bg-transparent"
          readOnly
        />
        <span hidden={tokenHidden}>{token.token}</span>
        <button onClick={toggleTokenVisibility}>
          {tokenHidden ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
      </td>
      <td>
        <span>{token.ownerEmail || "N/A"}</span>
      </td>
      <td>{new Date(token.createdAt).toLocaleString()}</td>
    </tr>
  );
}
