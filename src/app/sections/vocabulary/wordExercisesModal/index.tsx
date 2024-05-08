import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";

import { $randomWordsList } from "#stores/words";

import { ModalControlType } from "#hooks/useModalControl";

import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { TestLang } from "./testLang";
import { WordItemModel } from "#businessLogic/models/vocabulary";



export type WordExercisesModalType = {
  type: string;
}

type PropTypes = {
  modalControl: ModalControlType<WordExercisesModalType>;
  words: Array<WordItemModel>;
};


export const WordExercisesModal: FC<PropTypes> = (props) => {
  const { modalControl, words: currentPageWords } = props;

  const { type } = modalControl.modalProps;

  const randomWordsListState = useStore($randomWordsList.store);

  const [step, setStep] = useState(1);
  const [words, setWords] = useState(currentPageWords);

  useEffect(() => {
    return () => {
      if (randomWordsListState.data) {
        $randomWordsList.reset();
      }
    }
  }, []);

  useEffect(() => {
    if (randomWordsListState.data) {
      setWords(randomWordsListState.data);
      setStep(2);
    }
  }, [randomWordsListState.data]);


  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = () => {

  };

  return (
    <>
      <ModalUI.Loading show={randomWordsListState.loading} />
      {step === 1 && (
        <div>
          Для данного упражнения выбраны слова с текущей страницы

          <div>
            <ButtonUI type="primary" onClick={() => $randomWordsList.effect()}>
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
