import {
  sqliteTable,
  integer,
  text,
  index,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const collections = sqliteTable("collections", {
  id: integer("collections_id").primaryKey({ autoIncrement: true }),
  slug: text("collections_slug").unique(),
  name: text("collections_name").notNull(),
  created: integer("items_created").notNull(),
  updated: integer("items_updated").notNull(),
});

export const items = sqliteTable(
  "items",
  {
    id: integer("items_id").primaryKey({ autoIncrement: true }),
    slug: text("items_slug"),
    slugBase: text("items_slug_base").notNull(),
    slugNum: integer("items_slug_num").notNull().default(0),
    name: text("items_name").notNull(),
    collectionId: integer("items_collection_id")
      .notNull()
      .references(() => collections.id, {
        onDelete: "cascade",
      }),
    status: text("items_status").notNull().default("draft"),
    created: integer("items_created").notNull(),
    updated: integer("items_updated").notNull(),
    published: integer("items_published"),
  },
  (table) => ({
    statusIdx: index("items_status_idx").on(table.status),
    slugBaseIdx: index("items_slug_base_idx").on(table.slugBase),
    collectionIdIdx: index("items_collection_id_idx").on(table.collectionId),
    collectionIdSlugIdx: uniqueIndex("items_collection_id_slug_idx").on(
      table.collectionId,
      table.slug,
    ),
    collectionIdSlugBaseNumIdx: uniqueIndex(
      "items_collection_id_slug_base_num_idx",
    ).on(table.collectionId, table.slugBase, table.slugNum),
  }),
);

export const meta = sqliteTable(
  "meta",
  {
    itemId: integer("meta_item_id")
      .notNull()
      .references(() => items.id, {
        onDelete: "cascade",
      }),
    type: text("meta_type").notNull().default("text"),
    key: text("meta_key").notNull(),
    value: text("meta_value"),
    itemCollectionId: integer("meta_item_collection_id")
      .notNull()
      .references(() => collections.id, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.itemId, table.type, table.key] }),
    itemIdIdx: index("meta_item_id_idx").on(table.itemId),
    typeIdx: index("meta_type_idx").on(table.type),
    typeKeyIdx: index("meta_type_key_idx").on(table.type, table.key),
  }),
);
