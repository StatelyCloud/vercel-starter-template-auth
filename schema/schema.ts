import {
  itemType,
  string,
  timestampMilliseconds,
  uuid,
} from "@stately-cloud/schema";

/**
 * GoLink is a schema item type that represents a shortened URL, which is referenced by a short name.
 * Users of this webapp would visit a short url like https://go/foo to be redirected to the full URL.
 */
export const GoLink = itemType("GoLink", {
  keyPath: [
    "/users-:owner/l-:id",
    "/users-:owner/s-:short",
  ],
  fields: {
    id: { type: uuid, fieldNum: 1, initialValue: "uuid" },
    short: { type: string, fieldNum: 2 },
    url: { type: string, fieldNum: 3 },
    createdAt: {
      type: timestampMilliseconds,
      fieldNum: 4,
      fromMetadata: "createdAtTime",
    },
    owner: { type: string, fieldNum: 5 },
  },
});
