import getOrm from "../getOrm.ts";
import { ItemsSchema } from "../types.ts";
import insertItemWithSlug from "../utils/insertWithSlug.ts";
import { makeSlug } from "../utils/makeSlug.ts";

export async function createItem({
  DB,
  collectionId,
}: {
  DB: D1Database;
  collectionId: number;
}): Promise<{
  item?: ItemsSchema;
  error?: string;
}> {
  const db = getOrm(DB);
  const slugBase = makeSlug("item");

  try {
    const res = await insertItemWithSlug({
      db,
      rowToInsert: {
        collectionId,
        name: "New Item",
        slugBase,
        created: Date.now(),
        updated: Date.now(),
      },
    }).returning();

    if (!res?.[0]?.slug) {
      throw new Error("unknown");
    }

    return { item: res[0] };
  } catch (err) {
    return {
      error: "An error has occurred",
    };
  }
}
