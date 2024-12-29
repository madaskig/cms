import ButtonContextual from "@components/Button/ButtonContextual";
import Heading from "@components/Heading";
import Panel from "@components/Panel";
import LabelPill from "@components/Pill/LabelPill";
import Stack from "@components/Stack";
import { type TagsGroup } from "~/types";

function TagsGroupEditor({ tagsGroup }: { tagsGroup: TagsGroup }) {
  return (
    <Panel
      header={
        <Heading
          size="sm"
          as="h3"
          className="w-full text-center shadow-gray-200/70 text-slate-700"
        >
          {tagsGroup.label}
        </Heading>
      }
    >
      <Stack>
        {tagsGroup.tags.map((tag) => {
          return (
            <LabelPill
              key={tag.id}
              id={tag.id}
              label={tag.label}
              className="bg-gray-100 "
            />
          );
        })}
        <ButtonContextual context="add" className="flex justify-center" />
      </Stack>
    </Panel>
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
    <Stack spacing="lg" className="h-full justify-end">
      {tagGroups.map((group) => {
        return <TagsGroupEditor key={group.id} tagsGroup={group} />;
      })}
    </Stack>
  );
}
