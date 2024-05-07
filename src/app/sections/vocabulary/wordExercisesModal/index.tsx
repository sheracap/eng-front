import React, { FC, useState } from "react";

import { ModalControlType } from "#hooks/useModalControl";

import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { TestLang } from "#src/app/sections/vocabulary/wordExercisesModal/testLang";
import { WordItemModel } from "#businessLogic/models/vocabulary";


export type WordExercisesModalType = {
  type: string;
}

type PropTypes = {
  modalControl: ModalControlType<WordExercisesModalType>;
  words: Array<WordItemModel>;
};


export const WordExercisesModal: FC<PropTypes> = (props) => {
  const { modalControl, words } = props;

  const { type } = modalControl.modalProps;

  const [step, setStep] = useState(1);


  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = () => {

  };

  return (
    <>

      {step === 1 && (
        <div>
          Для данного упражнения выбраны слова с текущей страницы

          <div>
            <ButtonUI type="primary">
              Выбрать случайный список слов
            </ButtonUI>
            <ButtonUI type="primary" onClick={() => setStep(2)}>
              Продолжить
            </ButtonUI>
          </div>

        </div>
      )}

      {step === 2 && (
        <>
          {type === "TEST_LANG" && (
            <TestLang words={words} />
          )}
        </>
      )}
    </>
  );
};
