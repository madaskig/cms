import hono from "./hono.ts";
import getOrm from "../getOrm.ts";
import * as schemas from "~/schemas";
import insertItemWithSlug from "../utils/insertWithSlug.ts";

const insert = hono().get("/", async (c) => {
  const db = getOrm(c.env.DB);

  const collectionRes = await db
    .insert(schemas.collections)
    .values({
      slug: "posts",
      name: "Posts",
      created: Date.now(),
      updated: Date.now(),
    })
    .onConflictDoUpdate({
      target: schemas.collections.slug,
      set: {
        updated: Date.now(),
      },
    })
    .returning();

  //   const itemsRes = await db.insert(schemas.items).values({
  //     collectionId: collectionRes[0].id,
  //     slugBase: "a_post",
  //     name: "A Post !",
  //     created: Date.now(),
  //     updated: Date.now(),
  //   });

  const itemRes = await insertItemWithSlug({
    db,
    rowToInsert: {
      collectionId: collectionRes[0].id,
      slugBase: "a_post",
      name: "A Post Again!!!",
      created: Date.now(),
      updated: Date.now(),
    },
  });

  console.log({ collectionRes, itemRes });

  return c.json({
    test: "ok",
    collectionRes,
    itemRes,
  });
});

const v = hono().get("/", async (c) => {
  const db = getOrm(c.env.DB);

  const res = await db.select().from(schemas.items);

  console.log(res);

  return c.json({
    res,
  });
});

const app = hono();

const routes = app.route("/insert", insert).route("/v", v);

export default app;
