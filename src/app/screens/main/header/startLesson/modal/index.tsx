import React, { FC, useEffect, useState } from "react";
import { Steps } from "antd";

import { ModalControlType } from "#hooks/useModalControl";
import { $addChapter } from "#stores/chapter";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";

import "./styles.scss";

const { Step } = Steps;

type PropTypes = {
  modalControl: ModalControlType;
};

export const StartLessonModal: FC<PropTypes> = (props) => {
  const { modalControl } = props;

  const { closeModal } = modalControl;

  const [step, setStep] = useState(0);

  useEffect(() => {
    return () => {
      $addChapter.reset();
    };
  }, []);

  const onCancelClick = () => {
    if (step === 0) {
      closeModal();
    } else {
      setStep(0);
    }
  };

  const onContinueClick = () => {
    if (step === 0) {
      setStep(1);
    } else {

    }
  }


  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Начать урок</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <Steps current={step}>
          <Step title="Выберите урок" />
          <Step title="Выберите учеников" />
        </Steps>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={onCancelClick}>
              {step === 0 ? "Отмена" : "Назад"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={onContinueClick}>
              {step === 0 ? "Продолжить" : "Начать урок"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
