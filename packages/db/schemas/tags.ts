import {
  sqliteTable,
  integer,
  text,
  index,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { items } from "./items.ts";

export const tagsGroups = sqliteTable("tags_groups", {
  id: integer("tags_groups_id").primaryKey({ autoIncrement: true }),
  slug: text("tags_groups_slug").unique(),
  name: text("tags_groups_name").unique(),
});

export const tags = sqliteTable(
  "tags",
  {
    id: integer("tags_id").primaryKey({ autoIncrement: true }),
    groupId: integer("tags_group_id")
      .notNull()
      .references(() => tagsGroups.id, {
        onDelete: "cascade",
      }),
    slug: text("tags_slug").notNull(),
    name: text("tags_name").notNull(),
  },
  (table) => ({
    groupIdIdx: index("tags_group_id_idx").on(table.groupId),
    groupIdSlugIdx: uniqueIndex("tags_group_id_slug_idx").on(
      table.groupId,
      table.slug,
    ),
  }),
);

export const itemsToTags = sqliteTable(
  "items_to_tags",
  {
    itemId: integer("items_to_tags_item_id")
      .notNull()
      .references(() => items.id, {
        onDelete: "cascade",
      }),
    tagId: integer("items_to_tags_tag_id")
      .notNull()
      .references(() => tags.id, {
        onDelete: "cascade",
      }),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.itemId, table.tagId],
      }),
    };
  },
);
