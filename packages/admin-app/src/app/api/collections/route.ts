import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";
import { createCollection } from "@madaskig/cms-db";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const rawFilename = request.nextUrl.searchParams.get("k");

  const DB = getRequestContext().env.DB;

  console.log(DB);

  const dbRes = await createCollection({
    DB,
    name: "",
  });

  console.log(dbRes);

  return new Response(JSON.stringify(dbRes), {
    headers: {
      "content-type": "application/json",
    },
  });
}
