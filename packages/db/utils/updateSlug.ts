import { ItemsSchema } from "../types.ts";
import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schemas from "../schemas/index.ts";
import { slugCTE } from "./slugCTE.ts";
import { eq } from "drizzle-orm";

export const updateSlug = <T extends typeof schemas>({
  db,
  updatedValues,
}: {
  db: DrizzleD1Database<T>;
  updatedValues: Partial<ItemsSchema> & {
    id: ItemsSchema["id"];
    collectionId: ItemsSchema["collectionId"];
    slugBase: ItemsSchema["slugBase"];
  };
}) => {
  const table = schemas.items;

  const { cte, selectSlug, selectSlugNum } = slugCTE({
    db,
    rowToInsert: updatedValues,
  });

  const updateOp = db
    .with(cte)
    .update(table)
    .set({
      ...updatedValues,
      slug: selectSlug,
      slugNum: selectSlugNum,
    })
    .where(eq(table.id, updatedValues.id))
    .$dynamic();

  return updateOp;
};
