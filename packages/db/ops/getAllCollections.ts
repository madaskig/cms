import getOrm from "../getOrm.ts";
import * as schemas from "../schemas/index.ts";
import { CollectionsSchema } from "../types.ts";

export async function getAllCollections({ DB }: { DB: D1Database }): Promise<{
  collections?: CollectionsSchema[];
  error?: string;
}> {
  const db = getOrm(DB);

  try {
    const res = await db.select().from(schemas.collections);

    if (!res) {
      throw new Error("unknown");
    }

    return { collections: res };
  } catch (err) {
    console.error(err);
    return {
      error: "An error has occurred",
    };
  }
}
