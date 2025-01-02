import { and, count, eq, getTableColumns, max, sql } from "drizzle-orm";
import { ItemsSchemaForInsert } from "../types.ts";
import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schemas from "../schemas/index.ts";

export const slugCTE = <T extends typeof schemas>({
  db,
  rowToInsert,
}: {
  db: DrizzleD1Database<T>;
  rowToInsert: {
    id?: ItemsSchemaForInsert["id"];
    slugBase: ItemsSchemaForInsert["slugBase"];
    collectionId: ItemsSchemaForInsert["collectionId"];
  };
}) => {
  const table = schemas.items;
  const tableColumns = getTableColumns(table);

  const maxSlugNumSQ = db
    .select({
      maxSlugNum: max(tableColumns.slugNum).as("max_slug_num"),
      slugCount: count().as("slug_count"),
      unchangedSlug: rowToInsert.id
        ? sql<string>`IIF(${tableColumns.id} = ${rowToInsert.id}, ${tableColumns.slug}, NULL)`.as(
            "unchanged_slug",
          )
        : sql<string>`NULL`.as("unchanged_slug"),
      unchangedSlugNum: rowToInsert.id
        ? sql<number>`IIF(${tableColumns.id} = ${rowToInsert.id}, ${tableColumns.slugNum}, NULL)`.as(
            "unchanged_slug_num",
          )
        : sql<number>`NULL`.as("unchanged_slug_num"),
    })
    .from(table)
    .where(
      and(
        eq(tableColumns.slugBase, rowToInsert.slugBase),
        eq(tableColumns.collectionId, rowToInsert.collectionId),
      ),
    )
    .as("maxSlugNumSQ");

  const insertWithSlug = db.$with("insertWithSlug").as(
    db
      .select({
        slug: sql<string>`IFNULL(${maxSlugNumSQ.unchangedSlug}, ${rowToInsert.slugBase} || ( IIF(${maxSlugNumSQ.slugCount} > 0, "-" || (${maxSlugNumSQ.maxSlugNum} + 1), "") ))`.as(
          "generated_slug",
        ),
        slug_num:
          sql<number>`IFNULL(${maxSlugNumSQ.unchangedSlugNum}, IFNULL(${maxSlugNumSQ.maxSlugNum}, 0) + 1)`.as(
            "generated_slug_num",
          ),
        max_slug_num: maxSlugNumSQ.maxSlugNum,
        slug_count: maxSlugNumSQ.slugCount,
      })
      .from(maxSlugNumSQ),
  );

  return {
    cte: insertWithSlug,
    selectSlug: sql<string>`(select generated_slug from ${insertWithSlug})`,
    selectSlugNum: sql<number>`(select generated_slug_num from ${insertWithSlug})`,
  };
};
