import { getRequestContext } from "@cloudflare/next-on-pages";
import { getItemTags } from "@madaskig/cms-db";
import { TagGroupsList } from "./TagGroupsList";

export default async function TagsEditor({
  params,
}: {
  params: Promise<{ slug: string; item_id: string }>;
}) {
  const { item_id: itemIdStr } = await params;

  const itemId = Number(itemIdStr);

  const DB = getRequestContext().env.DB;

  const { tagGroups } = await getItemTags({
    DB,
    itemId,
  });

  return (
    <TagGroupsList itemId={itemId} groups={Object.values(tagGroups || {})} />
  );
}
