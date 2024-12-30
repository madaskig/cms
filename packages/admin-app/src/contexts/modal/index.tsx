"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export type Modal = {
  type: "input-form";
  data: any;
} | null;

export const ModalContext = createContext<{
  modal: Modal;
  setModal: Dispatch<SetStateAction<Modal>>;
}>({
  modal: null,
  setModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<Modal>(null);

  const context = useMemo(
    () => ({
      modal,
      setModal,
    }),
    [modal],
  );

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};
