import { eq, getTableColumns, sql } from "drizzle-orm";
import getOrm from "../getOrm.ts";
import * as schemas from "../schemas/index.ts";
import { TagsGroupsSchema, TagsSchema } from "../types.ts";

export async function getItemTags({
  DB,
  slug,
  itemId,
}: {
  DB: D1Database;
  slug?: string;
  itemId?: number;
}): Promise<{
  tagGroups?: Record<
    number,
    {
      group: TagsGroupsSchema;
      tags: TagsSchema[];
    }
  >;
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
      .select({
        tag: getTableColumns(schemas.tags),
        group: getTableColumns(schemas.tagsGroups),
      })
      .from(itemIdSQ)
      .leftJoin(
        schemas.itemsToTags,
        eq(schemas.itemsToTags.itemId, itemIdSQ.itemId),
      )
      .leftJoin(schemas.tags, eq(schemas.tags.id, schemas.itemsToTags.tagId))
      .leftJoin(
        schemas.tagsGroups,
        eq(schemas.tagsGroups.id, schemas.tags.groupId),
      );

    return {
      tagGroups: res.reduce(
        (acc, o) => {
          if (o.tag?.id && o.group?.id) {
            if (!acc[o.group.id]) {
              acc[o.group.id] = {
                group: o.group,
                tags: [],
              };
            }

            acc[o.group.id].tags.push(o.tag);
          }

          return acc;
        },
        {} as Record<
          number,
          {
            group: TagsGroupsSchema;
            tags: TagsSchema[];
          }
        >,
      ),
    };
  } catch (err) {
    console.error(err);
    return {
      error: (err as Error).message || "An error has occurred",
    };
  }
}
