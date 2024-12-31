"use client";

import { Modal as ModalUI } from "@components/Modal";
import { useMemo } from "react";
import { useModal } from "~/contexts/modal";
import { Overlay } from "~/ui/components/Overlay";
import Stack from "~/ui/components/Stack";
import { ModalInputForm } from "./ModalInputForm";
import { ModalImageUploader } from "./ModalImageUploader";

export default function Modal() {
  const { modal, setModal } = useModal();

  const modalContent = useMemo(() => {
    const commonProps = {
      closeModal: () => {
        setModal(null);
      },
    };

    switch (modal?.type) {
      case "input-form":
        return <ModalInputForm {...modal.data} {...commonProps} />;
      case "image-uploader":
        return <ModalImageUploader {...commonProps} />;
      default:
        return null;
    }
  }, [modal]);

  if (!modal || !modalContent) {
    return null;
  }

  return (
    <Overlay>
      <Stack className="size-full justify-center items-center">
        <ModalUI title={modal.title} variant={modal.variant}>
          {modalContent}
        </ModalUI>
      </Stack>
    </Overlay>
  );
}
