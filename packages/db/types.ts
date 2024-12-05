import * as schemas from "./schemas/index.ts";

export type SubjectSchema = typeof schemas.subjects.$inferSelect;
export type TagSchema = typeof schemas.tags.$inferSelect;
export type SubjectsToTagsSchema = typeof schemas.subjectsToTags.$inferSelect;
export type MetaSchema = typeof schemas.meta.$inferSelect;
export type AvailabilitiesSchema = typeof schemas.availabilities.$inferSelect;

export type SubjectInsertSchema = typeof schemas.subjects.$inferInsert;
export type TagInsertSchema = typeof schemas.tags.$inferInsert;
export type SubjectsToTagsInsertSchema =
  typeof schemas.subjectsToTags.$inferInsert;
export type MetaInsertSchema = typeof schemas.meta.$inferInsert;
export type AvailabilitiesInsertSchema =
  typeof schemas.availabilities.$inferInsert;
