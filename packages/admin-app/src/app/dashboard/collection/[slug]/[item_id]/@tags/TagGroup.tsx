"use client";

import { TagsGroupsSchema, TagsSchema } from "@madaskig/cms-db/types";
import ButtonContextual from "~/ui/components/Button/ButtonContextual";
import Heading from "~/ui/components/Heading";
import LabeledInput from "~/ui/components/Input/LabeledInput";
import Panel from "~/ui/components/Panel";
import LabelPill from "~/ui/components/Pill/LabelPill";
import Stack from "~/ui/components/Stack";

export function TagGroup({
  group,
  tags,
}: {
  group: TagsGroupsSchema;
  tags: TagsSchema[];
}) {
  return (
    <Panel
      header={
        <Heading
          size="sm"
          as="h3"
          className="w-full text-center shadow-gray-200/70 text-slate-700"
        >
          {group.name}
        </Heading>
      }
    >
      <Stack>
        {tags.map((tag) => {
          return (
            <LabelPill
              key={tag.slug}
              id={tag.slug}
              label={tag.name}
              className="bg-gray-100 "
            />
          );
        })}
        <Stack direction="horizontal" spacing="sm" className="items-center">
          <div className="flex-1 min-w-0 relative">
            <LabeledInput variant="reversed" />
          </div>
          <div className="flex-none h-full p-0.5 aspect-square">
            <ButtonContextual
              context="add-cta"
              size="md"
              type="submit"
              className="flex-none size-full"
            />
          </div>
        </Stack>
      </Stack>
    </Panel>
  );
}
