"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { updateItem } from "@madaskig/cms-db";
import { ItemsSchema } from "@madaskig/cms-db/types";

export async function updateItemAction({
  updatedValues,
}: {
  updatedValues: Partial<ItemsSchema> & {
    id: ItemsSchema["id"];
    collectionId: ItemsSchema["collectionId"];
  };
}) {
  const DB = getRequestContext().env.DB;

  const { error, item } = await updateItem({
    DB,
    updatedValues,
  });

  return {
    error: error || (item?.slug ? "" : "An error has occurred"),
    item,
  } as {
    error?: string | null;
    item?: ItemsSchema;
  };
}
