import { getRequestContext } from "@cloudflare/next-on-pages";
import ButtonContextual from "@components/Button/ButtonContextual";
import Heading from "@components/Heading";
import Panel from "@components/Panel";
import LabelPill from "@components/Pill/LabelPill";
import Stack from "@components/Stack";
import { getItemTags } from "@madaskig/cms-db";
import { TagsGroupsSchema, TagsSchema } from "@madaskig/cms-db/types";
import { ModalLauncher } from "~/contexts/modal";
import LabeledInput from "~/ui/components/Input/LabeledInput";

function TagsGroupEditor({
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
    <Stack spacing="lg" className="h-full justify-end">
      <Stack spacing="lg" className="h-full justify-end">
        {Object.values(tagGroups || {}).map(({ group, tags }) => {
          return <TagsGroupEditor key={group.id} group={group} tags={tags} />;
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
