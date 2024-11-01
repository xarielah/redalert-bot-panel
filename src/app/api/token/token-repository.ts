import dbConnect from "@/database/db-connect";
import Token, { TokenDocument } from "@/models/Token";
import crypto from "crypto";
import { isValidObjectId } from "mongoose";

export async function getAllSystemTokens() {
  await dbConnect();
  return Token.find({});
}

export async function getTokenById(id: string) {
  if (!isValidObjectId(id)) return null;
  await dbConnect();
  return Token.findById(id);
}

export async function getTokenByToken(token: string) {
  await dbConnect();
  return Token.findOne({ token });
}

export interface ICreateTokenPayload {
  tokenName: string;
  expiry: number;
  // scopes: string[];
  ownerEmail?: string;
}

export async function createNewToken(
  payload: ICreateTokenPayload
): Promise<TokenDocument> {
  await dbConnect();
  const token = generateRandomToken();
  return Token.create({ ...payload, token });
}

export async function updateToken(
  tokenId: string,
  payload: Partial<ICreateTokenPayload>
) {
  if (!isValidObjectId(tokenId)) return null;
  await dbConnect();
  return Token.findByIdAndUpdate(tokenId, payload, { new: true });
}

export function generateRandomToken() {
  return crypto.randomUUID();
}
