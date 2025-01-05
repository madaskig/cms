"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { addMeta } from "@madaskig/cms-db";
import { MetaSchema } from "@madaskig/cms-db/types";
import { extractMetaFormData } from "~/helpers/utils/extractMetaFormData";

export async function addMetaAction(
  prevState: any,
  formData: FormData,
): Promise<{
  meta?: MetaSchema;
  error?: string;
}> {
  const DB = getRequestContext().env.DB;

  try {
    const metaToInsert = extractMetaFormData(formData);

    const { error, meta } = await addMeta({
      DB,
      meta: metaToInsert,
    });

    return {
      error: error || (meta ? "" : "An error has occurred"),
      meta,
    } as {
      error?: string;
      meta?: MetaSchema;
    };
  } catch (err) {
    return {
      error: (err as Error).message || "An error has occurred",
    };
  }
}
