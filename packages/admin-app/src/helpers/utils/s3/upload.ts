"use server";

import "server-only";

import { ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { makeS3Bucket } from "./makeS3Client";
import { createBucket } from "./createBucket";
import { Readable } from "node:stream";

export default async function upload({
  bucketName: _bucketName,
  data,
  key,
  contentType,
}: {
  bucketName?: string;
  data: Readable;
  key: string;
  contentType?: string;
}) {
  const s3 = makeS3Bucket();

  const bucketName =
    _bucketName || (await createBucket({ bucketName: "assets" }));

  console.log(await s3.send(new ListBucketsCommand({})));
  const res = await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Body: data,
      Key: key,
      ContentType: contentType,
    }),
  );

  return res;
}
