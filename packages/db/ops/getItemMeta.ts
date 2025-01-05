import { eq, sql } from "drizzle-orm";
import getOrm from "../getOrm.ts";
import * as schemas from "../schemas/index.ts";
import { MetaSchema } from "../types.ts";

export async function getItemMeta({
  DB,
  slug,
  itemId,
}: {
  DB: D1Database;
  slug?: string;
  itemId?: number;
}): Promise<{
  meta?: MetaSchema[];
  error?: string;
}> {
  const db = getOrm(DB);

  try {
    if (!slug && !itemId) {
      throw new Error("either slug or itemId must be provided");
    }

    const itemIdSQ = db
      .select({
        itemId: itemId
          ? sql`${itemId}`.as("item_id")
          : sql`(SELECT ${schemas.items.id} FROM ${schemas.items.name.table} WHERE ${schemas.items.slug} = ${slug})`.as(
              "item_id",
            ),
      })
      .from(sql`(VALUES(1))`)
      .as("item_id_sq");

    const res = await db
      .select()
      .from(itemIdSQ)
      .leftJoin(schemas.meta, eq(schemas.meta.itemId, itemIdSQ.itemId));

    return {
      meta: res.reduce((acc, o) => {
        if (o.meta?.itemId) {
          acc.push(o.meta);
        }

        return acc;
      }, [] as MetaSchema[]),
    };
  } catch (err) {
    console.error(err);
    return {
      error: (err as Error).message || "An error has occurred",
    };
  }
}
