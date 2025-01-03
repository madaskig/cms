"use client";

import LabeledInput, { Indicator } from "~/ui/components/Input/LabeledInput";
import { debounce } from "es-toolkit";
import { ChangeEvent, useRef, useState } from "react";
import { updateItemAction } from "~/actions/server/updateItem";
import { ItemsSchema } from "@madaskig/cms-db/types";

export function TitleEditor({ item }: { item: ItemsSchema }) {
  const [value, setValue] = useState(item.name);
  const [indicator, setIndicator] = useState<Indicator>();

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
        setIndicator("success");
      } else {
        setIndicator("error");
      }
    }, 1000),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setIndicator("pending");
    setValue(v);
    commitValue.current(v);
  };

  return (
    <LabeledInput
      value={value}
      onChange={handleChange}
      variant="reversed"
      indicator={indicator}
    />
  );
}
