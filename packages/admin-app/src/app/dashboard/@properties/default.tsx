import { PropertyType, type PropertyGroup } from "~/types";
import KVEditor from "./_kv";
import Images from "./_images";

function PropertyGroupList({
  propertyGroup,
}: {
  propertyGroup: PropertyGroup;
}) {
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

function PropertyGroupEditor({
  propertyGroup,
}: {
  propertyGroup: PropertyGroup;
}) {
  return (
    <div className="relative flex flex-col gap-2">
      <h3 className="w-full text-left text-xs px-1 uppercase font-bold">
        {propertyGroup.label}
      </h3>
      <div>
        <PropertyGroupList propertyGroup={propertyGroup} />
      </div>
    </div>
  );
}

export default function PropertiesEditor() {
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
      properties: [
        // {
        //   key: "img1",
        //   value: "https://picsum.photos/id/28/800/450",
        //   type: PropertyType.image,
        //   label: "Image 1",
        // },
        // {
        //   key: "img2",
        //   value: "https://picsum.photos/id/18/800/450",
        //   type: PropertyType.image,
        //   label: "Image 2",
        // },
        // {
        //   key: "img3",
        //   value: "https://picsum.photos/id/29/800/450",
        //   type: PropertyType.image,
        //   label: "Image 3",
        // },
        // {
        //   key: "img4",
        //   value: "https://picsum.photos/id/49/800/450",
        //   type: PropertyType.image,
        //   label: "Image 4",
        // },
      ],
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
    <ul className="relative w-full h-full flex flex-col items-center gap-6">
      {propertyGroups.map((group) => {
        return (
          <li
            key={group.id}
            className="relative w-full p-2 rounded-lg bg-white shadow-lg shadow-gray-200"
          >
            <PropertyGroupEditor propertyGroup={group} />
          </li>
        );
      })}
    </ul>
  );
}
