import Gallery from "@components/Gallery";
import { Image } from "~/types";
import getAllImages from "~/helpers/utils/s3/getAllImages";
import CollectionTile from "@components/Tile/CollectionTile";
import AddTile from "@components/Tile/AddTile";

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
    <Gallery className="px-[4vw]" title="Collections" asGrid>
      <div className="col-span-2 aspect-square pt-2">
        <CollectionTile
          className="flex-none w-[80%]"
          id="1"
          slug="1"
          name="Posts"
          count={11}
        />
      </div>
      <div className="col-span-2 aspect-square pt-2">
        <CollectionTile
          className="flex-none w-[80%]"
          id="1"
          slug="1"
          name="Teams"
          count={4}
        />
      </div>
      <div className="col-span-2 aspect-square pt-2">
        <button className="relative flex-none w-[80%]">
          <AddTile />
        </button>
      </div>
    </Gallery>
  );
}
