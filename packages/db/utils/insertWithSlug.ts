import { ItemsSchemaForInsert } from "../types.ts";
import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schemas from "../schemas/index.ts";
import { slugCTE } from "./slugCTE.ts";

const insertItemWithSlug = <T extends typeof schemas>({
  db,
  rowToInsert,
}: {
  db: DrizzleD1Database<T>;
  rowToInsert: ItemsSchemaForInsert;
}) => {
  const table = schemas.items;

  const { cte, selectSlug, selectSlugNum } = slugCTE({
    db,
    rowToInsert,
  });

  const insertOp = db
    .with(cte)
    .insert(table)
    .values({
      ...rowToInsert,
      slug: selectSlug,
      slugNum: selectSlugNum,
    })
    .$dynamic();

  return insertOp;
};

export default insertItemWithSlug;
