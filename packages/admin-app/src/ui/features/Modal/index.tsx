import { Modal as ModalUI } from "@components/Modal";
import ButtonContextual from "~/ui/components/Button/ButtonContextual";
import LabeledInput from "~/ui/components/Input/LabeledInput";
import { Overlay } from "~/ui/components/Overlay";
import Stack from "~/ui/components/Stack";

export default function Modal() {
  return (
    <Overlay>
      <Stack className="size-full justify-center items-center">
        <ModalUI title="New Collection">
          <>
            <LabeledInput variant="reversed" label="Name" />
            <Stack direction="horizontal" spacing="md" className="justify-end">
              <ButtonContextual context="info-secondary" label="Cancel" />
              <ButtonContextual context="info" label="Confirm" />
            </Stack>
          </>
        </ModalUI>
      </Stack>
    </Overlay>
  );
}
