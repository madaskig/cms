import { getRequestContext } from "@cloudflare/next-on-pages";
import ImageSelector from "~/ui/features/ImageSelector";
import getAllImages from "~/helpers/utils/s3/getAllImages";
import { getItem } from "@madaskig/cms-db";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; item: string }>;
}) {
  const images = await getAllImages({ bucketName: "assets" });

  const { slug: collectionSlug, item: slug } = await params;

  const DB = getRequestContext().env.DB;
  const { item, collection } = await getItem({ DB, slug, collectionSlug });

  console.log({
    collection,
    item,
  });

  if (!item || !collection) {
    return null;
  }

  return (
    <section className="relative bg-white rounded-lg shadow-lg shadow-gray-300 overflow-hidden size-full p-4">
      <ImageSelector images={images} />
    </section>
  );
}
