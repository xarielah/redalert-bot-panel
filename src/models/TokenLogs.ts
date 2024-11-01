import mongoose, { SchemaTypes } from "mongoose";

export interface TokenLogsDocument extends mongoose.Document {
  tokenId: any;
  actualToken: string;
  initiatorIp: string;
  method: string;
  path: string;
  headers: string;
  body: string;
}

const TokenLogsSchema = new mongoose.Schema<TokenLogsDocument>(
  {
    // We need it if the token itself changes
    tokenId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Token",
    },
    // Actual token, just in case the token itself changes
    actualToken: {
      type: String,
      required: true,
    },
    // Initiation
    initiatorIp: {
      type: String,
      default: "",
    },
    // Request method
    method: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    // Request headers
    headers: {
      type: String,
      default: "",
    },
    // Request body
    body: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.TokenLogs ||
  mongoose.model("TokenLogs", TokenLogsSchema);
