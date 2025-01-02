"use client";

import { ReactNode, useActionState, useEffect } from "react";
import { createItemAction } from "~/actions/formActions/createItemAction";
import { LoadingTile } from "@components/Tile/LoadingTile";

export function ItemCreator({
  collectionId,
  children,
}: {
  collectionId: number;
  children: ReactNode;
}) {
  const [state, formAction, pending] = useActionState(createItemAction, {
    error: "",
  });

  useEffect(() => {
    console.log({
      state,
      pending,
    });
  }, [state, pending]);

  return (
    <form action={formAction}>
      {pending ? (
        <LoadingTile className="text-neutral" />
      ) : (
        <>
          <input
            value={collectionId}
            name="collection"
            id="collection"
            className="hidden"
            readOnly
          />
          {children}
        </>
      )}
    </form>
  );
}
