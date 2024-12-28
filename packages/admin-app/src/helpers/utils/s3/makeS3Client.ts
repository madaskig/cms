import "server-only";

import { S3Client } from "@aws-sdk/client-s3";

export function makeS3Bucket() {
  return new S3Client({
    region: "auto",
    forcePathStyle: true,
    credentials: {
      accessKeyId: "S3RVER",
      secretAccessKey: "S3RVER",
    },
    endpoint: "http://localhost:4569",
  });
}
