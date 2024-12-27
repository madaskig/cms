import { NextRequest } from "next/server";
import getObject from "~/helpers/utils/s3/getObject";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const filename = (await params).filename;

  if (!filename) {
    return new Response("Missing filename", {
      status: 403,
    });
  }

  const r = await getObject({
    bucketName: "assets",
    key: filename,
  });

  const contentType = r.ContentType;

  const body = r.Body?.transformToWebStream?.();

  return new Response(body, {
    headers: contentType
      ? {
          "content-type": contentType,
        }
      : undefined,
  });
}
