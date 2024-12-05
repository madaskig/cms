import {
  sqliteTable,
  integer,
  text,
  index,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const items = sqliteTable(
  "items",
  {
    id: integer("items_id").primaryKey({ autoIncrement: true }),
    slug: text("items_slug").unique(),
    name: text("items_name").notNull(),
    type: text("items_type").notNull(),
    images: text("items_images", { mode: "json" }),
    created: integer("items_created").notNull(),
    updated: integer("items_updated").notNull(),
    published: integer("items_published"),
  },
  (table) => ({
    type_idx: index("items_type_idx").on(table.type),
  }),
);

export const tags = sqliteTable(
  "tags",
  {
    id: integer("tags_id").primaryKey({ autoIncrement: true }),
    type: text("tags_type").notNull(),
    value: text("tags_value").notNull(),
    label: text("tags_label").notNull(),
  },
  (table) => ({
    type_idx: index("tags_type_idx").on(table.type),
    type_value_idx: index("tags_type_value_idx").on(table.type, table.value),
  }),
);

export const itemsToTags = sqliteTable(
  "items_to_tags",
  {
    item_id: integer("items_to_tags_item_id").references(() => items.id, {
      onDelete: "cascade",
    }),
    tag_id: integer("items_to_tags_tag_id").references(() => tags.id, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.item_id, table.tag_id],
      }),
    };
  },
);

export const meta = sqliteTable(
  "meta",
  {
    item_id: integer("meta_item_id").references(() => items.id, {
      onDelete: "cascade",
    }),
    key: text("meta_key").notNull(),
    value: text("meta_value"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.item_id, table.key] }),
    item_id_idx: index("meta_item_id_idx").on(table.item_id),
    meta_key_idx: index("meta_key_idx").on(table.key),
  }),
);
