import getOrm from "../getOrm.ts";
import * as schemas from "../schemas/index.ts";
import { CollectionsSchema } from "../types.ts";
import { makeSlug } from "../utils/makeSlug.ts";

export async function createCollection({
  DB,
  name,
}: {
  DB: D1Database;
  name: string;
}): Promise<{
  collection?: CollectionsSchema;
  error?: string;
}> {
  const db = getOrm(DB);

  const slug = makeSlug(name);

  try {
    const res = await db
      .insert(schemas.collections)
      .values({
        name: name,
        slug,
        created: Date.now(),
        updated: Date.now(),
      })
      .returning();

    if (!res?.[0]?.slug) {
      throw new Error("unknown");
    }

    return { collection: res[0] };
  } catch (err) {
    if ((err as Error).message?.startsWith?.("D1_ERROR: UNIQUE constraint")) {
      return {
        error: "Collection name already exists",
      };
    }

    return {
      error: "An error has occurred",
    };
  }
}
