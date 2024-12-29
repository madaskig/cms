import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import ButtonContextual from "@components/Button/ButtonContextual";
import KVInput, { type Props as KVInputProps } from "@components/Input/KVInput";
import Stack from "@components/Stack";
import Heading from "@components/Heading";

type Props = {
  onValidate?: (o: { key: string; value: string }) => void;
  onCancel?: () => void;
  inputProps?: KVInputProps;
  title?: string;
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export default function KVForm({
  onValidate,
  onCancel,
  inputProps,
  title,
  ...formProps
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      {...formProps}
    >
      <Stack spacing="md" className="px-1">
        {title ? (
          <Heading size="xs" as="p">
            {title}
          </Heading>
        ) : null}
        <KVInput {...inputProps} />

        <div className="relative w-full flex flex-row justify-end items-center gap-1">
          <ButtonContextual context="cancel" size="sm" onClick={onCancel} />
          <ButtonContextual context="validate" size="sm" type="submit" />
        </div>
      </Stack>
    </form>
  );
}
