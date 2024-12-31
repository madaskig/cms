"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ModalInputFormData } from "@features/Modal/ModalInputForm";
import { UI } from "~/types";

export type ModalType = "input-form" | "image-uploader";

type GetModalDataType<T extends ModalType> = T extends "input-form"
  ? { type: T; data?: ModalInputFormData }
  : T extends "image-uploader"
    ? { type: T }
    : { type: T };

export type Modal =
  | ({
      title?: string;
      variant?: UI.Size;
    } & (GetModalDataType<"input-form"> | GetModalDataType<"image-uploader">))
  | null;

export const ModalContext = createContext<{
  modal: Modal | null;
  setModal: Dispatch<SetStateAction<Modal>>;
}>({
  modal: null,
  setModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<Modal>(null);

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

export const ModalLauncher = ({
  children,
  modal,
  asButton,
  className,
}: {
  children: ReactNode;
  modal: Modal;
  asButton?: boolean;
  className?: string;
}) => {
  const { setModal } = useModal();

  const props = {
    className: `${asButton ? "" : "cursor-pointer"} ${className || ""}`,
    onClick: () => setModal(modal),
  };

  if (asButton) {
    return <button {...props}>{children}</button>;
  }

  return <div {...props}>{children}</div>;
};
