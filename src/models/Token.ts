import mongoose from "mongoose";

export interface TokenDocument extends mongoose.Document {
  token: string;
  tokenName: string;
  expiry: number;
  pastTokens?: string[];
  scopes?: string[];
  ownerEmail?: string;
  createdAt: string;
}

const TokenSchema = new mongoose.Schema<TokenDocument>(
  {
    // Token itself
    token: {
      type: String,
      required: true,
    },
    // Token name for identification
    tokenName: {
      type: String,
      required: true,
    },
    // Token expiry date in number representation
    expiry: {
      type: Number,
      required: true,
    },
    // When token is refreshed, past tokens are stored here
    pastTokens: {
      type: Array,
      default: [],
    },
    // Scopes for the token
    // TODO: Create enum for scopes, match it and enforce it API-wise.
    // A string array is sufficient for now.
    scopes: {
      type: Array,
      default: [],
    },
    ownerEmail: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);
