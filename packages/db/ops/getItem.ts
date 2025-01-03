import { and, eq } from "drizzle-orm";
import getOrm from "../getOrm.ts";
import * as schemas from "../schemas/index.ts";
import { CollectionsSchema, ItemsSchema } from "../types.ts";

export async function getItem({
  DB,
  slug,
  itemId,
  collectionSlug,
}: {
  DB: D1Database;
  slug?: string;
  itemId?: number;
  collectionSlug: string;
}): Promise<{
  item?: ItemsSchema | null;
  collection?: CollectionsSchema | null;
  error?: string;
}> {
  const db = getOrm(DB);

  try {
    if (!slug && !itemId) {
      throw new Error("either slug or itemId must be provided");
    }

    const res = await db
      .select()
      .from(schemas.collections)
      .where(eq(schemas.collections.slug, collectionSlug))
      .leftJoin(
        schemas.items,
        and(
          eq(schemas.items.collectionId, schemas.collections.id),
          itemId ? eq(schemas.items.id, itemId) : eq(schemas.items.slug, slug!),
        ),
      );

    if (!res[0]?.collections?.id || !res[0]?.items?.id) {
      return {
        item: null,
      };
    }

    return {
      item: res[0].items,
      collection: res[0].collections,
    };
  } catch (err) {
    console.error(err);
    return {
      error: (err as Error).message || "An error has occurred",
    };
  }
}
