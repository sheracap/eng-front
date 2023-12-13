import React, { FC, ReactElement } from "react";

import { useModalControl } from "#hooks/useModalControl";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";

import { useStyles } from "./styles";

interface PropTypes {
  title: string;
  onOk: () => void;
  okText?: string;
  children: ReactElement;
}

export const ModalConfirmUI: FC<PropTypes> = (props) => {
  const { title, onOk, okText, children } = props;
  const classes = useStyles();

  const modalControl = useModalControl();

  const handleClick = () => {
    modalControl.openModal();
  };

  const closeModal = () => {
    modalControl.closeModal();
  };

  const onOkClick = () => {
    onOk();
    closeModal();
  };

  return (
    <>
      {React.cloneElement(children, { onClick: handleClick })}

      <ModalUI
        className={classes.confirmModal}
        open={modalControl.modalProps.open}
        onCancel={modalControl.closeModal}
        closable={false}
      >
        <ModalUI.Title>{title}</ModalUI.Title>

        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={closeModal}>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={onOkClick}>
              {okText || "Да"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI>
    </>
  );
};
