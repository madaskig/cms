import { PropertyType, type PropertyGroup } from "~/types";
import KVEditor from "./_kv";
import Images from "./_images";
import Heading from "@components/Heading";
import Stack from "@components/Stack";
import Panel from "@components/Panel";
import { TitleEditor } from "./_title";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getItem } from "@madaskig/cms-db";

function getPanelBody(propertyGroup: PropertyGroup) {
  switch (propertyGroup.type) {
    case PropertyType.numeric:
    case PropertyType.text:
    case PropertyType.structuredText:
      return null;
    case PropertyType.image:
      return <Images list={propertyGroup.properties} />;
    case PropertyType.kv:
      return <KVEditor list={propertyGroup.properties} />;
    default:
      return null;
  }
}

const PanelHeader = ({ label }: { label: string }) => (
  <Heading
    size="sm"
    as="h3"
    className="w-full text-left text-neutral uppercase p-1"
  >
    {label}
  </Heading>
);

export default async function PropertiesEditor({
  params,
}: {
  params: Promise<{ slug: string; item: string }>;
}) {
  const { slug: collectionSlug, item: slug } = await params;

  console.log("properties !!! ", {
    collectionSlug,
    slug,
  });

  const DB = getRequestContext().env.DB;
  const { item, collection } = await getItem({ DB, slug, collectionSlug });

  console.log("PROPERTIES", {
    item,
    collection,
  });

  if (!item || !collection) {
    return null;
  }

  const propertyGroups: PropertyGroup[] = [
    {
      id: "group1",
      label: "Text",
      type: PropertyType.structuredText,
      properties: [],
    },
    {
      id: "group2",
      label: "Images",
      type: PropertyType.image,
      properties: [],
    },
    {
      id: "group3",
      label: "Properties",
      type: PropertyType.kv,
      properties: [
        {
          type: PropertyType.kv,
          key: "popularity",
          label: "Popularity",
          value: "83",
        },
        {
          type: PropertyType.kv,
          key: "externallink",
          label: "External Link",
          value: "https://example.com",
        },
      ],
    },
  ];

  return (
    <Stack spacing="xl">
      <Panel header={<PanelHeader label="Title" />}>
        <TitleEditor item={item} collection={collection} />
      </Panel>
      {propertyGroups.map((group) => {
        const panelBody = getPanelBody(group);
        return panelBody ? (
          <Panel key={group.id} header={<PanelHeader label={group.label} />}>
            {panelBody}
          </Panel>
        ) : null;
      })}
    </Stack>
  );
}
