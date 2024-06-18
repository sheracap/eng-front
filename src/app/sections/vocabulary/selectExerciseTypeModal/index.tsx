import React, { FC, useState } from "react";

import { ModalControlType } from "#hooks/useModalControl";

import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { notificationWarning } from "#ui/notifications";

import "./styles.scss";

type PropTypes = {
  modalControl: ModalControlType;
  callback: (type: string) => void;
};


const wordExerciseTypes = [
  { name: "Test English - Russian", code: "TEST_LANG" },
  { name: "Test Russian - English", code: "TEST_NATIVE" },
  { name: "Произношение", code: "PRONUNCIATION" },
];


export const SelectExerciseTypeModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const [selectedType, setSelectedType] = useState<string | null>(null);


  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = () => {
    if (!selectedType) {
      notificationWarning("Выберите тип", "");
      return;
    }

    modalControl.closeModal();

    callback(selectedType);
  };

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Выберите упражнение</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <div className="words__exercise-types">
          {wordExerciseTypes.map((item) => (
            <div
              key={item.code}
              className={`words__exercise-types__item ${selectedType === item.code ? "active" : ""}`}
              onClick={() => setSelectedType(item.code)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={onCancelClick}>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={onFinish}>
              Далее
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
