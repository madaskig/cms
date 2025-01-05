import { PropertyType, type PropertyGroup } from "~/types";
import KVEditor from "./_kv";
import Images from "./_images";
import Heading from "@components/Heading";
import Stack from "@components/Stack";
import Panel from "@components/Panel";
import { TitleEditor } from "./_title";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getItem, getItemMeta } from "@madaskig/cms-db";
import { MetaSchema, MetaType } from "@madaskig/cms-db/types";

const PanelHeader = ({ label }: { label: string }) => (
  <Heading
    size="sm"
    as="h3"
    className="flex-none w-full text-left text-neutral uppercase p-1"
  >
    {label}
  </Heading>
);

export default async function PropertiesEditor({
  params,
}: {
  params: Promise<{ slug: string; item_id: string }>;
}) {
  const { slug: collectionSlug, item_id: itemIdStr } = await params;

  const itemId = Number(itemIdStr);

  const DB = getRequestContext().env.DB;
  const [{ item, collection }, { meta = [] }] = await Promise.all([
    getItem({ DB, itemId, collectionSlug }),
    getItemMeta({
      DB,
      itemId,
    }),
  ]);

  if (!item || !collection) {
    return null;
  }

  console.log({
    meta,
  });

  const { kv, images } = meta.reduce(
    (acc, metaObj) => {
      acc[metaObj.type === MetaType.image ? "images" : "kv"].push(metaObj);

      return acc;
    },
    {
      kv: [],
      images: [],
    } as { kv: MetaSchema[]; images: MetaSchema[] },
  );

  return (
    <Stack className="h-full" spacing="xl">
      <Panel className="flex-none" header={<PanelHeader label="Title" />}>
        <TitleEditor item={item} />
      </Panel>
      <Panel className="flex-none" header={<PanelHeader label="Images" />}>
        <Images list={images} />
      </Panel>
      <Panel
        className="flex-1 min-h-0"
        header={<PanelHeader label="Properties" />}
      >
        <KVEditor list={kv} item={item} />
      </Panel>
    </Stack>
  );
}
