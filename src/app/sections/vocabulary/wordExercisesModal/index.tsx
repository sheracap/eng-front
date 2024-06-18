import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";

import { $randomWordsList } from "#stores/words";

import { ModalControlType } from "#hooks/useModalControl";

import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { TestLang } from "./testLang";
import { WordItemModel } from "#businessLogic/models/vocabulary";
import { TestNative } from "#src/app/sections/vocabulary/wordExercisesModal/testNative";
import { PronunciationEx } from "#src/app/sections/vocabulary/wordExercisesModal/pronunciation";


export type WordExercisesModalType = {
  type: string;
  words: Array<WordItemModel>;
}

type PropTypes = {
  modalControl: ModalControlType<WordExercisesModalType>;
};


export const WordExercisesModal: FC<PropTypes> = (props) => {
  const { modalControl } = props;

  const { type, words: currentPageWords } = modalControl.modalProps;

  const randomWordsListState = useStore($randomWordsList.store);

  const [step, setStep] = useState(1);
  const [words, setWords] = useState(currentPageWords);
  const [exType, selectExType] = useState("CURRENT");


  useEffect(() => {
    return () => {
      if (randomWordsListState.data) {
        $randomWordsList.reset();
      }
    }
  }, []);

  useEffect(() => {
    if (randomWordsListState.data.length) {
      setWords(randomWordsListState.data);
      setStep(2);
    }
  }, [randomWordsListState.data]);

  const onExTypeChange = (val: string) => {
    if (!randomWordsListState.loading) {
      selectExType(val);
    }
  }

  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onContinue = () => {
    if (exType === "RANDOM") {
      $randomWordsList.effect();
    } else {
      setStep(2);
    }
  };

  return (
    <>
      <ModalUI.Loading show={randomWordsListState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Упражнение на запоминание слов</ModalUI.Title>
      </ModalUI.Header>
      {step === 1 && (
        <>
          <ModalUI.Middle>
            <div className="words-exercise-type-select">
              <div
                className={`words-exercise-type-select__item ${exType === "CURRENT" ? "active" : ""}`}
                onClick={() => onExTypeChange("CURRENT")}
              >
                <div className="words-exercise-type-select__item__title">Слова с текущей страницы</div>
              </div>
              <div
                className={`words-exercise-type-select__item ${exType === "RANDOM" ? "active" : ""}`}
                onClick={() => onExTypeChange("RANDOM")}
              >
                <div className="words-exercise-type-select__item__title">Случайный список слов</div>
                <div className="words-exercise-type-select__item__desc">Список слов будет подобран случайным образом по всему словарю</div>
              </div>
              <ModalUI.Footer>
                <ModalUI.Buttons>
                  <ModalUI.Buttons.Col>
                    <ButtonUI type="secondary" onClick={onCancelClick}>
                      Отмена
                    </ButtonUI>
                  </ModalUI.Buttons.Col>
                  <ModalUI.Buttons.Col>
                    <ButtonUI type="primary" onClick={() => onContinue()} loading={randomWordsListState.loading}>
                      Продолжить
                    </ButtonUI>
                  </ModalUI.Buttons.Col>
                </ModalUI.Buttons>
              </ModalUI.Footer>
            </div>
          </ModalUI.Middle>
        </>
      )}

      {step === 2 && words.length > 0 && (
        <>
          {type === "TEST_LANG" && (
            <TestLang words={words} />
          )}
          {type === "TEST_NATIVE" && (
            <TestNative words={words} />
          )}
          {type === "PRONUNCIATION" && (
            <PronunciationEx words={words} />
          )}
        </>
      )}
    </>
  );
};
