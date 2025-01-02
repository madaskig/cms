"use client";

import { ModalProps } from "~/types";
import ButtonContextual from "~/ui/components/Button/ButtonContextual";
import LabeledInput, {
  type Props as LabeledInputProps,
} from "~/ui/components/Input/LabeledInput";
import Stack from "~/ui/components/Stack";

export type ModalInputFormData = {
  inputs?: Array<LabeledInputProps>;
  action?: (o: FormData) => void;
  isPending?: boolean;
  error?: string;
};

type Props = ModalInputFormData & ModalProps;

export function ModalInputForm({
  inputs = [],
  error,
  closeModal,
  action,
}: Props) {
  return (
    <form action={action}>
      <Stack spacing="lg">
        {inputs.map((o) => {
          return <LabeledInput key={o.id} {...o} />;
        })}
        {error ? (
          <p className="text-sm leading-none text-error font-semibold">
            {error}
          </p>
        ) : null}
        <Stack direction="horizontal" spacing="sm" className="justify-end">
          <ButtonContextual
            context="info-secondary"
            label="Cancel"
            onClick={closeModal}
          />
          <ButtonContextual context="info" label="Confirm" type="submit" />
        </Stack>
      </Stack>
    </form>
  );
}
