"use server";

import { revalidatePath } from "next/cache";
import { statelyClient } from "./stately";
import {GoLink} from "./generated/index";
import { keyPath } from "@stately-cloud/client";
import { auth } from "@/auth";
import crypto from 'crypto';

/**
 * Fetches all GoLinks from StatelyDB.
 * @returns An array of all GoLinks, sorted by creation date.
 */
export async function fetchLinks() {
  const userHash = await getUserIdentity();
  const prefix = keyPath`/users-${userHash}/l`;
  const links = [];
  const iter = statelyClient.beginList(prefix, { limit: 100 });
  for await (const item of iter) {
    if (statelyClient.isType(item, "GoLink")) {
      links.push(item);
    }
  }
  return [...links].sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });
}

/**
 * Creates a new GoLink in StatelyDB.
 * @param formData The form data containing the short name and URL of the new GoLink.
 */
export async function createLink(formData: FormData) {
  const userHash = await getUserIdentity();
  const short = formData.get("short") as string;
  const url = formData.get("url") as string;
  const link = await statelyClient.put(
    statelyClient.create("GoLink", {
      short,
      url,
      owner: userHash,
    })
  );
  console.log("Created link:", link); 
  revalidatePath("/");
}

/**
 * Retrieves a GoLink from StatelyDB by its short name.
 * @param short The short name of the GoLink to retrieve.
 * @returns The GoLink with the given short name, or undefined if not found.
 */
export async function getLink(short: string): Promise<GoLink | undefined> {
  const userHash = await getUserIdentity();
  return statelyClient.get("GoLink", keyPath`/users-${userHash}/s-${short}`);
}


/**
 * Retrieves the user identity as a hash for inclusion in the StatelyDB key path.
 */
export async function getUserIdentity() {
  const session = await auth();
  return crypto.createHash('sha256').update(session?.user?.email || "unknown").digest('hex');
}