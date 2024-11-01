import { createClient } from "./generated/index.js";

if (!process.env.STATELY_CLIENT_ID) {
  throw new Error("Missing STATELY_CLIENT_ID");
}
if (!process.env.STATELY_CLIENT_SECRET) {
  throw new Error("Missing STATELY_CLIENT_SECRET");
}
if (!process.env.STATELY_STORE_ID) {
  throw new Error("Missing STATELY_STORE_ID");
}

// Create the StatelyDB client (server-side only)
export const statelyClient = createClient(
  BigInt(process.env.STATELY_STORE_ID),
  { region: "us-west-2" }, // Adjust based on your store's region
);
