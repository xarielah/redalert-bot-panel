import { type TokenDocument } from "@/models/Token";

export function tokenDto(result: TokenDocument) {
  return {
    id: result._id,
    tokenName: result.tokenName,
    token: result.token,
    expiry: result.expiry,
    ownerEmail: result.ownerEmail || undefined,
    createdAt: result.createdAt,
  };
}
