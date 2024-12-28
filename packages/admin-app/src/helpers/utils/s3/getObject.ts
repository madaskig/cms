"use server";

import "server-only";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { makeS3Bucket } from "./makeS3Client";

export default async function getObject({
  bucketName,
  key,
}: {
  bucketName: string;
  key: string;
}) {
  const s3 = makeS3Bucket();

  const res = await s3.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    }),
  );

  return res;
}
