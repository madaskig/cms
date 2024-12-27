import AddButton from "~/components/AddButton";
import { type TagsGroup } from "~/types";

function TagsGroupEditor({ tagsGroup }: { tagsGroup: TagsGroup }) {
  return (
    <div className="relative w-full flex flex-col shadow-lg shadow-gray-200/70 rounded-lg">
      <h3 className="w-full px-2 py-1 shadow-gray-200/70 rounded-lg text-center text-sm font-bold text-slate-700">
        {tagsGroup.label}
      </h3>
      <ul className="relative w-full flex flex-col gap-2 p-2">
        {tagsGroup.tags.map((tag) => {
          return (
            <li
              key={tag.id}
              className="w-full rounded-md text-center bg-gray-100 p-1 text-xs font-semibold"
            >
              {tag.label}
            </li>
          );
        })}
        <AddButton variant="small" />
        {/* <button className="w-full rounded-md text-center p-1 text-sm text-gray-800 font-bold bg-gray-200">
          +
        </button> */}
      </ul>
    </div>
  );
}

export default function TagsEditor() {
  const tagGroups: TagsGroup[] = [
    {
      id: "group1",
      label: "Uncategorized",
      tags: [
        { id: "premium", label: "Premium" },
        { id: "best", label: "The Very Best" },
        { id: "promotion", label: "Promotion" },
      ],
    },
    {
      id: "group2",
      label: "Genre",
      tags: [
        { id: "drama", label: "Drama" },
        { id: "comedy", label: "Comedy" },
      ],
    },
    {
      id: "group3",
      label: "Language",
      tags: [],
    },
  ];

  return (
    <ul className="relative w-full h-full flex flex-col justify-end gap-4">
      {tagGroups.map((group) => {
        return (
          <li key={group.id}>
            <TagsGroupEditor tagsGroup={group} />
          </li>
        );
      })}
      {/* <button></button> */}
    </ul>
  );
}
