import * as schemas from "./schemas/index.ts";

export type ItemsSchema = typeof schemas.items.$inferSelect;
export type CollectionsSchema = typeof schemas.collections.$inferSelect;
export type MetaSchema = typeof schemas.meta.$inferSelect;
export type TagsSchema = typeof schemas.tags.$inferSelect;
export type TagsGroupsSchema = typeof schemas.tagsGroups.$inferSelect;
export type ItemsToTagsSchema = typeof schemas.itemsToTags.$inferSelect;
export type AssetsSchema = typeof schemas.assets.$inferSelect;

export type ItemsSchemaForInsert = typeof schemas.items.$inferInsert;
export type CollectionsSchemaForInsert =
  typeof schemas.collections.$inferInsert;
export type MetaSchemaForInsert = typeof schemas.meta.$inferInsert;
export type TagsSchemaForInsert = typeof schemas.tags.$inferInsert;
export type TagsGroupsSchemaForInsert = typeof schemas.tagsGroups.$inferInsert;
export type ItemsToTagsSchemaForInsert =
  typeof schemas.itemsToTags.$inferInsert;
export type AssetsSchemaForInsert = typeof schemas.assets.$inferInsert;
