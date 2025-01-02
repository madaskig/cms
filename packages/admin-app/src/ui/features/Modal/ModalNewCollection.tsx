"use client";

import { useActionState } from "react";
import { createCollectionAction } from "~/actions/formActions/createCollectionAction";
import { ModalProps } from "~/types";
import { Indicator as LabeledInputIndicator } from "~/ui/components/Input/LabeledInput";
import { ModalInputForm } from "~/ui/components/Modal/ModalInputForm";

type Props = ModalProps;

export function ModalNewCollection({ closeModal }: Props) {
  const [state, formAction, pending] = useActionState(createCollectionAction, {
    error: "",
    slug: "",
  });

  const indicator: LabeledInputIndicator = pending
    ? "pending"
    : state.error
      ? "error"
      : state.slug
        ? "success"
        : "idle";

  return (
    <ModalInputForm
      inputs={[
        {
          id: "name",
          name: "name",
          label: "Name",
          variant: "reversed",
          indicator: indicator,
        },
      ]}
      closeModal={closeModal}
      action={formAction}
      error={state.error || ""}
      isPending={pending}
    />
  );
}
