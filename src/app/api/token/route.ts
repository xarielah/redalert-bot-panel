import { TokenDocument } from "@/models/Token";
import { auth } from "@clerk/nextjs/server";
import { tokenDto } from "./token-dto";
import {
  createNewToken,
  getAllSystemTokens,
  ICreateTokenPayload,
} from "./token-repository";

// Used for admins to get information about ALL the system tokens
export async function GET() {
  try {
    await auth.protect();
    const tokens = await getAllSystemTokens();
    return Response.json({
      message: "Tokens fetch was successful",
      result: tokenResultDto(tokens),
    });
  } catch (error) {
    return Response.json({ error: "GET request failed" });
  }
}

// Create new token
export async function POST(req: Request) {
  try {
    await auth.protect();
    const body = await req.json();
    return await handleTokenCreation(body);
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json(
      { error: "Token creation was failed, try again later" },
      { status: 500 }
    );
  }
}

async function handleTokenCreation(body: any) {
  if (!body.tokenName || !body.expiry) {
    return Response.json(
      {
        error:
          "Invalid request, request should include name and expiry date number value",
      },
      { status: 400 }
    );
  }

  if (
    new Date().setMinutes(new Date().getMinutes() + 10) >
    new Date(body.expiry).getTime()
  ) {
    return Response.json(
      {
        error:
          "Invalid request, expiry date should be at least 10 minutes from now",
      },
      { status: 400 }
    );
  }

  const creationPayload: ICreateTokenPayload = {
    tokenName: body.tokenName,
    expiry: body.expiry,
    ownerEmail: body.ownerEmail,
  };
  const result = await createNewToken(creationPayload);
  if (!result) {
    return Response.json({ error: "Token creation failed" });
  }
  return Response.json({
    message: `Token id:${result._id} was created successfuly`,
    result: tokenDto(result),
  });
}

function tokenResultDto(tokens: TokenDocument[]) {
  return tokens.map((t) => tokenDto(t));
}
