"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { createItem } from "@madaskig/cms-db";
import { ItemsSchema } from "@madaskig/cms-db/types";

const timeout = async (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(true), ms));

export async function createItemAction(prevState: any, formData: FormData) {
  const DB = getRequestContext().env.DB;
  const collectionIdStr = formData.get("collection") as string;

  const collectionId = Number(collectionIdStr);

  if (!collectionId) {
    return {
      error: "An error has occurred",
    };
  }

  console.log(":: IN ACTION ::", {
    collectionId,
  });

  const { error, item } = await createItem({
    DB,
    collectionId,
  });

  return {
    error: error || (item?.slug ? "" : "An error has occurred"),
    item,
  } as {
    error?: string | null;
    item?: ItemsSchema;
  };
}
