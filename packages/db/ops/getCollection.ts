import { eq } from "drizzle-orm";
import getOrm from "../getOrm.ts";
import * as schemas from "../schemas/index.ts";
import { CollectionsSchema, ItemsSchema } from "../types.ts";

export async function getCollection({
  DB,
  slug,
}: {
  DB: D1Database;
  slug: string;
}): Promise<{
  collection?: CollectionsSchema;
  items?: ItemsSchema[];
  error?: string;
}> {
  const db = getOrm(DB);

  try {
    const res = await db
      .select()
      .from(schemas.collections)
      .where(eq(schemas.collections.slug, slug))
      .leftJoin(
        schemas.items,
        eq(schemas.items.collectionId, schemas.collections.id),
      );

    if (!res[0]?.collections?.id) {
      throw new Error("unknown");
    }

    return {
      collection: res[0].collections,
      items: res.reduce((acc, o) => {
        if (o.items) {
          acc.push(o.items);
        }
        return acc;
      }, [] as ItemsSchema[]),
    };
  } catch (err) {
    console.error(err);
    return {
      error: "An error has occurred",
    };
  }
}
