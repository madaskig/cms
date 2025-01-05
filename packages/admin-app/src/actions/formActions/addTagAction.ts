"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { addTag, addTagGroup } from "@madaskig/cms-db";
import { TagsGroupsSchema, TagsSchema } from "@madaskig/cms-db/types";

export async function addTagAction(
  prevState: any,
  formData: FormData,
): Promise<{
  error?: string;
  tagGroup?: TagsGroupsSchema;
  tag?: TagsSchema;
}> {
  const groupName = formData.get("group-name") as string | undefined;
  const groupIdStr = formData.get("group-id") as string | undefined;
  const tagName = formData.get("tag") as string | undefined;
  const itemIdStr = formData.get("item") as string | undefined;

  const groupId = groupIdStr ? Number(groupIdStr) : undefined;
  const itemId = itemIdStr ? Number(itemIdStr) : undefined;

  if (!tagName) {
    return {
      error: "Missing tag name",
    };
  }

  if (!groupId && !groupName) {
    return {
      error: "One of tag group name or id must be provided",
    };
  }

  const DB = getRequestContext().env.DB;

  let tagGroupData: TagsGroupsSchema | undefined;
  let tagGroupId = groupId;

  if (!tagGroupId) {
    const { error: tagGroupError, tagGroup } = await addTagGroup({
      DB,
      name: groupName!,
    });

    if (!tagGroup?.id || tagGroupError) {
      return {
        error: tagGroupError || "Error creating tag group",
      };
    }

    tagGroupId = tagGroup.id;
    tagGroupData = tagGroup;
  }

  const { error, tag } = await addTag({
    DB,
    groupId: tagGroupId,
    name: tagName,
    itemId,
  });

  return {
    error: error || (tag?.id ? "" : "An error has occurred"),
    tag,
    tagGroup: tagGroupData,
  };
}
