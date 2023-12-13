import { useState } from "react";

export type ModalControlType<T = unknown> = {
  modalProps: { open: boolean } & T;
  openModal: (props?: T) => void;
  closeModal: () => void;
  updateProps: (props: T) => void;
};

export const useModalControl = <T>(initialModalProps?: T): ModalControlType<T> => {
  const [modalProps, setModalProps] = useState<ModalControlType["modalProps"] & T>({
    open: false,
    ...initialModalProps,
  } as ModalControlType["modalProps"] & T);

  const openModal = (props?: T) => {
    setModalProps({ open: true, ...props } as ModalControlType["modalProps"] & T);
  };

  const closeModal = () => {
    setModalProps({ open: false, ...initialModalProps } as ModalControlType["modalProps"] & T);
  };

  const updateProps = (props: T) => {
    setModalProps({ ...modalProps, ...props });
  };

  return {
    modalProps,
    openModal,
    closeModal,
    updateProps,
  };
};
