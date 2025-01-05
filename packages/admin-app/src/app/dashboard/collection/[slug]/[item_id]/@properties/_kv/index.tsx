"use client";

import { useEffect, useRef, useState } from "react";
import NewKVForm from "./NewKVForm";
import useAnimatedListInsert from "~/helpers/hooks/useAnimatedListInsert";
import ButtonContextual from "@components/Button/ButtonContextual";
import Stack from "@components/Stack";
import LabeledInput from "@components/Input/LabeledInput";
import {
  ItemsSchema,
  MetaSchema,
  MetaSchemaForInsert,
} from "@madaskig/cms-db/types";

export default function KVEditor({
  list,
  item,
}: {
  list: MetaSchema[];
  item: ItemsSchema;
}) {
  const [displayedList, setDisplayedList] = useState(list);
  const [settledList, setSettledList] = useState(list);
  const [formKey, setFormKey] = useState(1);

  const optimisticallyInsertMetaToList = (meta: MetaSchema) => {
    const currentListFiltered = displayedList.filter((o) => o.key !== meta.key);

    setDisplayedList([...currentListFiltered, meta]);
  };

  return (
    <Stack className="flex-1 min-h-0">
      <Stack className="flex-1 min-h-0 overflow-auto">
        {displayedList.map((property) => {
          return (
            <LabeledInput
              key={property.key}
              label={property.key}
              defaultValue={property.value || undefined}
            />
          );
        })}
        <div>
          <NewKVForm
            key={formKey}
            item={item}
            onValidate={optimisticallyInsertMetaToList}
            onCancel={() => setFormKey((x) => (x + 1) % 3)}
            onSuccess={(meta: MetaSchema) => {
              console.log("SUCCESS :::: ", meta);
            }}
          />
        </div>
      </Stack>
    </Stack>
  );
}
