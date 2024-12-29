"use server";

import "server-only";

import getAllObjects from "./getAllObjects";
import { Image, S3Image } from "~/types";

const HOST = `http://localhost:3000`;

export default async function getAllImages({
  bucketName,
}: {
  bucketName: string;
}) {
  const r = await getAllObjects({
    bucketName,
  });

  const contents = r.Contents as S3Image[];

  const images: Image[] = contents.map((o) => ({
    id: o.Key,
    src: `${HOST}/images/${o.Key}`,
    name: o.Key,
    size: o.Size,
  }));

  return images;
}
