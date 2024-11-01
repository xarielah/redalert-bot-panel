import { auth } from "@clerk/nextjs/server";
import { isValidObjectId } from "mongoose";
import { tokenDto } from "../token-dto";
import { getTokenById } from "../token-repository";

interface GetTokenParams {
  params: Promise<{ tokenId: string }>;
}

export async function GET(req: Request, { params }: GetTokenParams) {
  try {
    await auth.protect();
    const p = await params;
    console.log("🚀 ~ GET ~  p:", p);
    if (!isValidObjectId(p.tokenId))
      return Response.json({ error: "Invalid token ID" }, { status: 400 });

    const result = await getTokenById(p.tokenId);

    if (!result)
      return Response.json({ error: "Token not found" }, { status: 404 });

    return Response.json({ result: tokenDto(result), message: "Token found" });
  } catch (e) {
    return Response.json({ error: "GET request failed" });
  }
}
