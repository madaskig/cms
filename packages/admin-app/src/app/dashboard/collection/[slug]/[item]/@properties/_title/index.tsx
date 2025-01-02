"use client";

import LabeledInput from "~/ui/components/Input/LabeledInput";
import { debounce } from "es-toolkit";
import { ChangeEvent, useRef, useState } from "react";
import { updateItemAction } from "~/actions/server/updateItem";
import { CollectionsSchema, ItemsSchema } from "@madaskig/cms-db/types";

export function TitleEditor({
  item,
  collection,
}: {
  item: ItemsSchema;
  collection: CollectionsSchema;
}) {
  const [value, setValue] = useState(item.name);

  const updateHistory = useRef(
    debounce((updatedSlug) => {
      if (updatedSlug && window) {
        window.history.replaceState(
          null,
          "",
          `/dashboard/collection/${collection.slug}/${updatedSlug}`,
        );
      }
    }, 700),
  );

  const commitValue = useRef(
    debounce(async (v) => {
      const res = await updateItemAction({
        updatedValues: {
          id: item.id,
          name: v,
          collectionId: item.collectionId,
        },
      });

      if (res.item?.slug) {
        updateHistory.current(res.item.slug);
      }
    }, 1000),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    updateHistory.current.cancel();
    setValue(v);
    commitValue.current(v);
  };

  return (
    <LabeledInput value={value} onChange={handleChange} variant="reversed" />
  );
}
