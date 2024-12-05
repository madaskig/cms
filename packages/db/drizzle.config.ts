import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  driver: "d1-http",
  schema: "./schemas/index.ts",
  out: "./migrations",
  verbose: true,
  strict: true,
});
