import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  InputHTMLAttributes,
} from "react";
import ButtonContextual from "@components/Button/ButtonContextual";
import KVInput, { type Props as KVInputProps } from "@components/Input/KVInput";
import Stack from "@components/Stack";
import Heading from "@components/Heading";

type Props = {
  onValidate?: (o: { key: string; value: string }) => void;
  onCancel?: () => void;
  inputProps?: KVInputProps;
  hiddenInputs?: Array<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  >;
  title?: string;
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export default function KVForm({
  onValidate,
  onCancel,
  inputProps,
  title,
  hiddenInputs = [],
  ...formProps
}: Props) {
  return (
    <form {...formProps}>
      <Stack spacing="md" className="px-1">
        {title ? (
          <Heading size="xs" as="p">
            {title}
          </Heading>
        ) : null}
        <KVInput {...inputProps} />

        {hiddenInputs.map((hiddenInput) => (
          <input
            key={hiddenInput.id || hiddenInput.name}
            {...hiddenInput}
            hidden
            readOnly
            className="hidden"
          />
        ))}

        <div className="relative w-full flex flex-row justify-end items-center gap-1">
          <ButtonContextual
            context="cancel"
            size="sm"
            type="button"
            onClick={onCancel}
          />
          <ButtonContextual context="validate" size="sm" type="submit" />
        </div>
      </Stack>
    </form>
  );
}
