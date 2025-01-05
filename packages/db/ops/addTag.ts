import getOrm from "../getOrm.ts";
import { TagsSchema } from "../types.ts";
import { makeSlug } from "../utils/makeSlug.ts";
import * as schemas from "../schemas/index.ts";

export async function addTag({
  DB,
  groupId,
  name,
  itemId,
}: {
  DB: D1Database;
  groupId: number;
  name: string;
  itemId?: number;
}): Promise<{
  tag?: TagsSchema;
  error?: string;
}> {
  const db = getOrm(DB);
  const slug = makeSlug(name);

  try {
    const res = await db
      .insert(schemas.tags)
      .values({
        slug,
        name,
        groupId,
      })
      .onConflictDoUpdate({
        target: [schemas.tags.groupId, schemas.tags.slug],
        set: {
          name,
        },
      })
      .returning();

    if (!res?.[0]?.slug) {
      throw new Error("unknown");
    }

    const tag = res[0];

    if (itemId) {
      await db
        .insert(schemas.itemsToTags)
        .values({
          itemId,
          tagId: tag.id,
        })
        .onConflictDoNothing();
    }

    return { tag };
  } catch (err) {
    return {
      error: "An error has occurred",
    };
  }
}
