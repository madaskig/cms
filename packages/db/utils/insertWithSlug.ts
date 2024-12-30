import { and, count, eq, getTableColumns, max, sql } from "drizzle-orm";
import { ItemsSchemaForInsert } from "../types.ts";
import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schemas from "../schemas/index.ts";

const insertItemWithSlug = <T extends typeof schemas>({
  db,
  rowToInsert,
}: {
  db: DrizzleD1Database<T>;
  rowToInsert: ItemsSchemaForInsert;
}) => {
  const table = schemas.items;
  const tableColumns = getTableColumns(table);

  const maxSlugNumSQ = db
    .select({
      maxSlugNum: max(tableColumns.slugNum).as("max_slug_num"),
      slugCount: count().as("slug_count"),
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
        slug: sql<string>`${rowToInsert.slugBase} || ( IIF(${maxSlugNumSQ.slugCount} > 0, "-" || (${maxSlugNumSQ.maxSlugNum} + 1), "") )`.as(
          "generated_slug",
        ),
        slug_num: sql<number>`IFNULL(${maxSlugNumSQ.maxSlugNum}, 0) + 1`.as(
          "generated_slug_num",
        ),
        max_slug_num: maxSlugNumSQ.maxSlugNum,
        slug_count: maxSlugNumSQ.slugCount,
      })
      .from(maxSlugNumSQ),
  );

  const insertOp = db
    .with(insertWithSlug)
    .insert(table)
    .values({
      ...rowToInsert,
      slug: sql<string>`(select generated_slug from ${insertWithSlug})`,
      slugNum: sql<number>`(select generated_slug_num from ${insertWithSlug})`,
    })
    .$dynamic();

  return insertOp;
};

export default insertItemWithSlug;
