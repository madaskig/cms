import { getRequestContext } from "@cloudflare/next-on-pages";
import Gallery from "@components/Gallery";
import AddTile from "@components/Tile/AddTile";
import { getCollection } from "@madaskig/cms-db";
import { ItemCreator } from "~/ui/features/ItemCreator";
import ItemTile, { ItemTileImgContainer } from "~/ui/components/Tile/ItemTile";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const DB = getRequestContext().env.DB;
  const { collection, items } = await getCollection({ DB, slug });

  if (!collection || !items) {
    return null;
  }

  return (
    <Gallery
      className="px-[4vw]"
      spacing="xl"
      gridSpacing="lg"
      title={
        <span>
          {`Collections`}
          <span className="text-neutral font-bold">{` / ${collection.name}`}</span>
        </span>
      }
      asGrid
    >
      {items.map((item) => {
        return (
          <ItemTile
            key={item.id}
            className="relative col-span-2 w-full"
            {...item}
          />
        );
      })}

      <ItemTileImgContainer className="col-span-2 w-full">
        <ItemCreator collectionId={collection.id}>
          <button className="contents" type="submit">
            <AddTile />
          </button>
        </ItemCreator>
      </ItemTileImgContainer>
    </Gallery>
  );
}
