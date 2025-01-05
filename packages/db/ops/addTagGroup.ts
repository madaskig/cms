import { eq } from "drizzle-orm";
import getOrm from "../getOrm.ts";
import * as schemas from "../schemas/index.ts";
import { TagsGroupsSchema } from "../types.ts";
import { makeSlug } from "../utils/makeSlug.ts";

export async function addTagGroup({
  DB,
  name,
}: {
  DB: D1Database;
  name: string;
}): Promise<{
  tagGroup?: TagsGroupsSchema;
  error?: string;
}> {
  const db = getOrm(DB);

  const slug = makeSlug(name);

  try {
    let res = await db
      .insert(schemas.tagsGroups)
      .values({
        name: name,
        slug,
      })
      .onConflictDoNothing()
      .returning();

    if (!res?.[0]?.id) {
      res = await db
        .select()
        .from(schemas.tagsGroups)
        .where(eq(schemas.tagsGroups.slug, slug));
    }

    if (!res?.[0]?.id) {
      throw new Error("unknown");
    }

    return { tagGroup: res[0] };
  } catch (err) {
    return {
      error: (err as Error).message || "An error has occurred",
    };
  }
}
