import React, { FC, useEffect, useState } from "react";
import { ModalUI } from "#ui/modal";
import { ButtonUI } from "#ui/button";
import { WordItemModel } from "#businessLogic/models/vocabulary";
import { shuffledArray } from "#utils/index";
import { myCurrentLang } from "#src/app/sections/vocabulary/addWordModal";
import { notificationWarning } from "#ui/notifications";

type PropsTypes = {
  words: Array<WordItemModel>;
}

type AnswersWordType = { key: number; name: string; isCorrect: boolean; };

const getWrongAnswers = (inputList, excludeIndex) => {
  // Copy the input list to avoid modifying the original list
  let tempList = inputList.slice();

  // Remove the element at the excludeIndex
  tempList.splice(excludeIndex, 1);

  tempList = shuffledArray(tempList);

  // Shuffle the tempList
  const newList: Array<AnswersWordType> = [];

  for (let i = 0; i < 3; i++) {
    const item = tempList[i];
    const key = (excludeIndex * 4) + i + 1;

    newList.push({ key: key === 0 ? 1 : key, name: item.translate[myCurrentLang], isCorrect: false });
  }

  // Return the first 3 elements of the shuffled tempList
  return newList;
}

export const TestLang: FC<PropsTypes> = (props) => {
  const { words } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState(shuffledArray(words));
  const [answers, setAnswers] = useState<Array<AnswersWordType>>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<null | { isCorrect: boolean; index: number; }>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const newAnswers = [
      { key: currentIndex * 4, name: shuffledWords[currentIndex].translate[myCurrentLang], isCorrect: true },
      ...getWrongAnswers(words, currentIndex)
    ];

    setAnswers(shuffledArray(newAnswers));
  }, [currentIndex]);

  const onSelectAnswer = (item: AnswersWordType, index) => {
    if (selectedAnswer) {
      setSelectedAnswer({ isCorrect: item.isCorrect, index });
    } else {

    }
  }

  const onNext = () => {
    if (selectedAnswer === null) {
      notificationWarning("Выберите ответ", "");
      return;
    } else if (selectedAnswer.isCorrect) {
      setCorrectAnswersCount((prevState) => prevState + 1);
    }

    setSelectedAnswer(null);
    setAnswers([]);

    if (shuffledWords.length === currentIndex + 1) {
      setShowResult(true);
    } else {
      setCurrentIndex((prevState) => prevState + 1);
    }
  }

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title></ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>

        {showResult ? (
          <div>
            {correctAnswersCount} / {shuffledWords.length}
          </div>
        ): (
          <div className="words-test-exercise">
            <div className="words-test-exercise__value">{shuffledWords[currentIndex].value}</div>

            {!answers.length && <div>Loading</div>}

            <div className="words-test-exercise__answers">
              {answers.map((item, index) => (
                <div
                  key={item.key}
                  className={`
                    words-test-exercise__answers__item
                    ${selectedAnswer && item.isCorrect ? "correct" : selectedAnswer && !selectedAnswer.isCorrect && index === selectedAnswer.index ? "wrong" : ""}
                  `}
                  onClick={() => onSelectAnswer(item, index)}
                >
                  {item.name}
                </div>
              ))}
            </div>

          </div>
        )}

      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={onNext}>
              Далее
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  )
}