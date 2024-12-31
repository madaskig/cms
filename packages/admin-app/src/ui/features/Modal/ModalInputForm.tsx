import { ModalProps } from "~/types";
import ButtonContextual from "~/ui/components/Button/ButtonContextual";
import LabeledInput, { Variant } from "~/ui/components/Input/LabeledInput";
import Stack from "~/ui/components/Stack";

export type ModalInputFormData = {
  inputs?: Array<{
    id: string;
    label: string;
    type?: "text" | "password" | "email";
    variant?: Variant;
  }>;
};

type Props = ModalInputFormData & ModalProps;

export function ModalInputForm({ inputs = [], closeModal }: Props) {
  return (
    <Stack spacing="lg">
      {inputs.map((o) => {
        return (
          <LabeledInput
            key={o.id}
            label={o.label}
            type={o.type}
            variant={o.variant}
          />
        );
      })}
      <Stack direction="horizontal" spacing="sm" className="justify-end">
        <ButtonContextual
          context="info-secondary"
          label="Cancel"
          onClick={closeModal}
        />
        <ButtonContextual context="info" label="Confirm" />
      </Stack>
    </Stack>
  );
}
