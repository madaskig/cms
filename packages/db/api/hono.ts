import { Hono as BaseHono, MiddlewareHandler } from "hono";
import { createMiddleware as baseCreateMiddleware } from "hono/factory";

type Bindings = {
  DB: D1Database;
};

type Variables = {};

export default () =>
  new BaseHono<{ Bindings: Bindings; Variables: Variables }>();

export const createMiddleware = <T extends Record<string, unknown>>(
  m: MiddlewareHandler,
) =>
  baseCreateMiddleware<{
    Bindings: Bindings;
    Variables: Variables & T;
  }>(m);
