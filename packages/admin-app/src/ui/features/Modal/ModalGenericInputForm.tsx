"use client";

import { ModalProps } from "~/types";
import {
  ModalInputForm,
  ModalInputFormData,
} from "~/ui/components/Modal/ModalInputForm";

export type ModalGenericInputFormData = ModalInputFormData;

type Props = ModalGenericInputFormData & ModalProps;

export function ModalGenericInputForm(props: Props) {
  return <ModalInputForm dataTestId="modal-generic-input-form" {...props} />;
}
