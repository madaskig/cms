"use client";

import { Modal as ModalUI } from "@components/Modal";
import { useMemo } from "react";
import { useModal } from "~/contexts/modal";
import { Overlay } from "~/ui/components/Overlay";
import Stack from "~/ui/components/Stack";
import { ModalGenericInputForm } from "./ModalGenericInputForm";
import { ModalImageUploader } from "./ModalImageUploader";
import { ModalNewCollection } from "./ModalNewCollection";
import { ModalNewTagGroup } from "./ModalNewTagGroup";

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
        return <ModalGenericInputForm {...modal.data} {...commonProps} />;
      case "image-uploader":
        return <ModalImageUploader {...commonProps} />;
      case "new-collection":
        return <ModalNewCollection {...commonProps} />;
      case "new-tag-group":
        return <ModalNewTagGroup {...modal.data} {...commonProps} />;
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
        <ModalUI title={modal.title} size={modal.size}>
          {modalContent}
        </ModalUI>
      </Stack>
    </Overlay>
  );
}
