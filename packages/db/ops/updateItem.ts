import getOrm from "../getOrm.ts";
import { ItemsSchema } from "../types.ts";
import { makeSlug } from "../utils/makeSlug.ts";
import { updateSlug } from "../utils/updateSlug.ts";
import * as schemas from "../schemas/index.ts";
import { eq } from "drizzle-orm";

export async function updateItem({
  DB,
  updatedValues,
}: {
  DB: D1Database;
  updatedValues: Partial<ItemsSchema> & {
    id: ItemsSchema["id"];
    collectionId: ItemsSchema["collectionId"];
  };
}): Promise<{
  item?: ItemsSchema;
  error?: string;
}> {
  const db = getOrm(DB);

  try {
    if (updatedValues.name !== null && updatedValues.name !== undefined) {
      const slugBase = makeSlug(updatedValues.name);

      if (!slugBase) {
        throw new Error("Invalid name/slug");
      }

      const res = await updateSlug({
        db,
        updatedValues: {
          ...updatedValues,
          slugBase,
          slugNum: 0,
          updated: Date.now(),
        },
      }).returning();

      return {
        item: res[0],
      };
    } else if (
      updatedValues.slug ||
      updatedValues.slugBase ||
      updatedValues.slugNum
    ) {
      throw new Error(
        "Invalid operation: Cannot update slug without updating item name",
      );
    } else {
      const res = await db
        .update(schemas.items)
        .set({
          ...updatedValues,
          updated: Date.now(),
        })
        .where(eq(schemas.items.id, updatedValues.id))
        .returning();

      return {
        item: res[0],
      };
    }
  } catch (err) {
    return {
      error: "An error has occurred",
    };
  }
}
