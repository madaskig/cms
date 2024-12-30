import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";

export const assets = sqliteTable(
  "assets",
  {
    id: integer("assets_id").primaryKey({ autoIncrement: true }),
    slug: text("assets_slug").unique(),
    name: text("assets_name").notNull(),
    type: text("assets_type").notNull(),
    mimetype: text("assets_mimetype").notNull(),
    created: integer("items_created").notNull(),
  },
  (table) => ({
    type_idx: index("assets_type_idx").on(table.type),
  }),
);
