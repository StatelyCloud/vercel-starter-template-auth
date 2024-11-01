// Code generated by Stately. DO NOT EDIT.

import { createClient as createGenericClient } from "@stately-cloud/client";
import {
  GoLinkSchema,
} from "./schema_pb.js";

export const typeToSchema = {
  // itemTypes
  "GoLink": GoLinkSchema,

  // objectTypes
};

const SCHEMA_VERSION_ID = 0

export function createClient(storeId, opts) {
  return createGenericClient(storeId, typeToSchema, SCHEMA_VERSION_ID, opts);
}
