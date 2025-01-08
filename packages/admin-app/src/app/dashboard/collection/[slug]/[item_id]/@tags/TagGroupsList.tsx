"use client";

import { TagsGroupsSchema, TagsSchema } from "@madaskig/cms-db/types";
import { ModalLauncher } from "~/contexts/modal";
import ButtonContextual from "~/ui/components/Button/ButtonContextual";
import Stack from "~/ui/components/Stack";
import { TagGroup } from "./TagGroup";
import { useState } from "react";

export function TagGroupsList({
  itemId,
  groups,
}: {
  itemId: number;
  groups: Array<{ group: TagsGroupsSchema; tags: TagsSchema[] }>;
}) {
  const [displayedList, setDisplayedList] = useState(groups);

  const optimisticallyInsertToList = ({
    tag,
    group,
  }: {
    tag: TagsSchema;
    group: TagsGroupsSchema;
  }) => {
    setDisplayedList((currentList) => {
      const existingGroupIdx = currentList.findIndex(
        (o) => o.group.id === group.id,
      );

      const existingGroup =
        existingGroupIdx > -1 ? currentList[existingGroupIdx] : null;

      if (existingGroup) {
        const dedupedTagsList = [
          ...existingGroup.tags.filter((t) => t.slug !== tag.slug),
          tag,
        ];

        const updatedGroupList = [...currentList];

        updatedGroupList.splice(existingGroupIdx, 1, {
          group: existingGroup.group,
          tags: dedupedTagsList,
        });

        return updatedGroupList;
      }

      return [
        ...currentList,
        {
          group,
          tags: [tag],
        },
      ];
    });
  };

  return (
    <Stack spacing="lg" className="h-full justify-end">
      <Stack spacing="lg" className="h-full justify-end">
        {displayedList.map(({ group, tags }) => {
          return <TagGroup key={group.id} group={group} tags={tags} />;
        })}
      </Stack>

      <ModalLauncher
        className="w-full flex flex-col"
        modal={{
          type: "new-tag-group",
          title: "Add Tag Group",
          size: "xs",
          data: {
            itemId,
            onSuccess: ({
              tag,
              tagGroup,
            }: {
              tag: TagsSchema;
              tagGroup: TagsGroupsSchema;
            }) => {
              console.log("SUCCESS !1!!!", {
                tag,
                tagGroup,
              });

              optimisticallyInsertToList({
                tag,
                group: tagGroup,
              });
            },
          },
        }}
      >
        <ButtonContextual
          context="add-cta"
          className="flex justify-center"
          label={<span className="font-bold">Add Tag</span>}
          size="lg"
        />
      </ModalLauncher>
    </Stack>
  );
}
