import TextEditor from "@components/TextEditor";
import Gallery from "@components/Gallery";
import ImageSelector from "~/ui/features/ImageSelector";
import { Image } from "~/types";
import getAllImages from "~/helpers/utils/s3/getAllImages";

const IMAGES = new Array(9).fill(null).map((_, i) => {
  return {
    id: i,
    name: `Image ${i}`,
    src: `https://picsum.photos/id/${i + 11}/800/450`,
  };
});

export const dynamic = "force-dynamic";

export default async function Page() {
  const images = await getAllImages({ bucketName: "assets" });

  return (
    <section className="relative bg-white rounded-lg shadow-lg shadow-gray-300 overflow-hidden size-full p-4">
      {/* <TextEditor /> */}

      <ImageSelector images={images} />
    </section>
  );
}
