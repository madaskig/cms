import getOrm from "../getOrm.ts";
import * as schemas from "../schemas/index.ts";
import { MetaSchema, MetaSchemaForInsert } from "../types.ts";

export async function addMeta({
  DB,
  meta,
}: {
  DB: D1Database;
  meta: MetaSchemaForInsert;
}): Promise<{
  meta?: MetaSchema;
  error?: string;
}> {
  const db = getOrm(DB);

  try {
    const res = await db
      .insert(schemas.meta)
      .values(meta)
      .onConflictDoUpdate({
        target: [schemas.meta.itemId, schemas.meta.type, schemas.meta.key],
        set: meta,
      })
      .returning();

    if (!res?.[0]?.itemId) {
      throw new Error("unknown");
    }

    return { meta: res[0] };
  } catch (err) {
    return {
      error: (err as Error).message || "An error has occurred",
    };
  }
}
