import { getTokenByToken } from "@/app/api/token/token-repository";

export default async function validateApiToken(
  token?: string | undefined | null
) {
  if (!token) return null;
  const result = await getTokenByToken(token);
  if (!result) return null;
  if (result.expiry < Date.now()) return null;
  return true;
}
