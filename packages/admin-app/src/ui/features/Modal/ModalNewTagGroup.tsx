"use client";

import { TagsGroupsSchema, TagsSchema } from "@madaskig/cms-db/types";
import { useActionState, useEffect } from "react";
import { addTagAction } from "~/actions/formActions/addTagAction";
import { ModalProps } from "~/types";
import { Indicator as LabeledInputIndicator } from "~/ui/components/Input/LabeledInput";
import { ModalInputForm } from "~/ui/components/Modal/ModalInputForm";

export type ModalNewTagGroupData = {
  itemId: number;
  onSuccess?: ({
    tag,
    tagGroup,
  }: {
    tag: TagsSchema;
    tagGroup: TagsGroupsSchema;
  }) => void;
};

type Props = ModalProps & ModalNewTagGroupData;

export function ModalNewTagGroup({ closeModal, onSuccess, itemId }: Props) {
  const [state, formAction, pending] = useActionState(addTagAction, {
    error: "",
  });

  useEffect(() => {
    console.log({
      state,
      pending,
    });

    if (!pending && state.tag && state.tagGroup && !state.error) {
      onSuccess?.({
        tag: state.tag,
        tagGroup: state.tagGroup,
      });
    }
  }, [state, pending]);

  const indicator: LabeledInputIndicator = pending
    ? "pending"
    : state.error
      ? "error"
      : state.tagGroup
        ? "success"
        : "idle";

  return (
    <ModalInputForm
      dataTestId="modal-new-tag-group"
      inputs={[
        {
          id: "group-name",
          name: "group-name",
          label: "Group name",
          variant: "reversed",
          indicator: indicator,
        },
        {
          id: "tag",
          name: "tag",
          label: "Tag value",
          variant: "reversed",
          indicator: indicator,
        },
      ]}
      hiddenInputs={[
        {
          name: "item",
          value: itemId,
        },
      ]}
      closeModal={closeModal}
      action={formAction}
      error={state.error || ""}
      isPending={pending}
    />
  );
}
