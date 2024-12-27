"use server";

import "server-only";

import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { makeS3Bucket } from "./makeS3Client";

export async function createBucket({ bucketName }: { bucketName: string }) {
  const s3 = makeS3Bucket();
  await s3.send(
    new CreateBucketCommand({
      Bucket: bucketName,
    }),
  );

  return bucketName;
}
