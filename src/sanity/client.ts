import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

/**
 * `projectId` must be a valid slug for createClient, so we fall back to a
 * harmless placeholder when Sanity isn't configured yet. We never actually
 * call this client unless `isSanityConfigured` is true (see lib/data.ts).
 */
export const client = createClient({
  projectId: isSanityConfigured ? projectId : "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});
