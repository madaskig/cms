import Gallery from "@components/Gallery";
import CollectionTile from "@components/Tile/CollectionTile";
import AddTile from "@components/Tile/AddTile";
import { ModalLauncher } from "~/contexts/modal";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <Gallery className="px-[4vw]" title="Collections" asGrid>
      <div className="relative col-span-2 aspect-square w-4/5 pt-4">
        <CollectionTile id="1" slug="1" name="Posts" count={11} />
      </div>
      <div className="col-span-2 aspect-square w-4/5 pt-4">
        <CollectionTile id="1" slug="1" name="Teams" count={4} />
      </div>
      <ModalLauncher
        className="col-span-2 aspect-square w-4/5 pt-4"
        modal={{
          type: "input-form",
          title: "New collection",
          variant: "xs",
          data: {
            inputs: [
              {
                id: "name",
                label: "Name",
                variant: "reversed",
              },
            ],
          },
        }}
      >
        <AddTile />
      </ModalLauncher>
    </Gallery>
  );
}
