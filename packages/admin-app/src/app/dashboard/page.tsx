import { getRequestContext } from "@cloudflare/next-on-pages";
import Gallery from "@components/Gallery";
import CollectionTile from "@components/Tile/CollectionTile";
import AddTile from "@components/Tile/AddTile";
import { ModalLauncher } from "~/contexts/modal";
import { getAllCollections } from "@madaskig/cms-db";

export default async function Page() {
  const DB = getRequestContext().env.DB;
  const { collections } = await getAllCollections({ DB });

  if (!collections) {
    return null;
  }

  return (
    <Gallery className="px-[4vw]" title="Collections" asGrid>
      {collections.map((collection) => {
        return (
          <div className="relative col-span-2 aspect-square w-4/5 pt-4">
            <CollectionTile
              id={collection.id}
              slug={collection.slug!}
              name={collection.name}
              count={9}
            />
          </div>
        );
      })}
      <ModalLauncher
        className="col-span-2 aspect-square w-4/5 pt-4"
        modal={{
          type: "new-collection",
          title: "New collection",
          size: "xs",
        }}
      >
        <AddTile />
      </ModalLauncher>
    </Gallery>
  );
}
