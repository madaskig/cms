import { drizzle } from "drizzle-orm/d1";
import { D1Database } from "@cloudflare/workers-types";
import * as schemas from "./schemas/index.ts";

export const getOrm = (db: D1Database) => {
  return drizzle(db, { schema: schemas });
};
