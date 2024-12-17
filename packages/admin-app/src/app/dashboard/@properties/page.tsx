import { PropertyType, type PropertyGroup } from "~/types";
import KVPropertyEditor from "./KVPropertyEditor";

function PropertyGroupList({
  propertyGroup,
}: {
  propertyGroup: PropertyGroup;
}) {
  switch (propertyGroup.type) {
    case PropertyType.numeric:
    case PropertyType.text:
    case PropertyType.structuredText:
    case PropertyType.image:
      return null;
    case PropertyType.kv:
      return <KVPropertyEditor list={propertyGroup.properties} />;
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
    <div className="relative flex flex-col gap-4">
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
