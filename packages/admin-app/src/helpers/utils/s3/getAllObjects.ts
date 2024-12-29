"use server";

import "server-only";

import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { makeS3Bucket } from "./makeS3Client";

export default async function getAllObjects({
  bucketName,
}: {
  bucketName: string;
}) {
  const s3 = makeS3Bucket();

  const res = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucketName,
    }),
  );

  return res;
}
