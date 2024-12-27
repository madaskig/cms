import { NextRequest } from "next/server";
import { Readable } from "node:stream";
import { ReadableStream } from "stream/web";
import { determineFileExtension } from "~/helpers/utils/files";
import { MIMEType } from "~/types";
import upload from "~/helpers/utils/s3/upload";

export async function POST(request: NextRequest) {
  const rawFilename = request.nextUrl.searchParams.get("k");
  const contentType = request.headers.get("content-type") as MIMEType;

  if (!rawFilename || !contentType) {
    return new Response("Missing filename or content-type", {
      status: 403,
    });
  }

  const fileExtension = determineFileExtension(contentType);

  const filename = new RegExp(`\.${fileExtension}$`).test(rawFilename)
    ? rawFilename
    : `${rawFilename}.${fileExtension}`;

  const r = await upload({
    bucketName: "assets",
    key: filename,
    data: Readable.fromWeb(request.body as ReadableStream),
    contentType,
  });

  return new Response("ok");
}
