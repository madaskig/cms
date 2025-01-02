"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { createCollection } from "@madaskig/cms-db";

export async function createCollectionAction(
  prevState: any,
  formData: FormData,
) {
  const name = formData.get("name") as string;

  const DB = getRequestContext().env.DB;

  const { error, collection } = await createCollection({
    DB,
    name,
  });

  return {
    error: error || (collection?.slug ? "" : "An error has occurred"),
    slug: collection?.slug || "",
  } as {
    error?: string | null;
    slug?: string;
  };
}
