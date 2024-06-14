import React, { FC, useEffect, useState } from "react";
import { Progress } from "antd";
import { ModalUI } from "#ui/modal";
import { ButtonUI } from "#ui/button";
import { WordItemModel } from "#businessLogic/models/vocabulary";
import { shuffledArray } from "#utils/index";
import { myCurrentLang } from "#src/app/sections/vocabulary/addWordModal";
import { notificationWarning } from "#ui/notifications";
import { Spinner } from "#ui/spinner";
import { TestResult } from "../components/testResult";
import { getWrongAnswers, AnswersWordType } from "../utils";

type PropsTypes = {
  words: Array<WordItemModel>;
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
      ...getWrongAnswers(words, shuffledWords[currentIndex].id, currentIndex, "TRANSLATE")
    ];

    setAnswers(shuffledArray(newAnswers));
  }, [currentIndex]);

  const onSelectAnswer = (item: AnswersWordType, index) => {
    if (!selectedAnswer) {
      setSelectedAnswer({ isCorrect: item.isCorrect, index });
    }
  }

  const onNext = () => {
    if (showResult) {
      setShowResult(false);
      setCorrectAnswersCount(0);
      setCurrentIndex(0);

      return;
    }

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
      <ModalUI.Middle>
        {showResult ? (
          <TestResult
            resultPercent={Number((correctAnswersCount * 100 / shuffledWords.length).toFixed(0))}
            correctAnswersCount={correctAnswersCount}
            wordsLength={shuffledWords.length}
          />
        ) : (
          <>
            <div>
              <Progress
                percent={showResult ? 100 : Number((currentIndex * 100 / shuffledWords.length).toFixed(0))}
              />

              {currentIndex} / {shuffledWords.length}
            </div>
            <div className="words-test-exercise">
              <div className="words-test-exercise__value">{shuffledWords[currentIndex].value}</div>

              {!answers.length && (
                <div className="abs-loader">
                  <Spinner />
                </div>
              )}

              <div className="words-test-exercise__answers">
                {answers.map((item, index) => (
                  <div
                    key={item.key}
                    className={`
                      words-test-exercise__answers__item
                      ${selectedAnswer ? "has-answer" : ""}
                      ${selectedAnswer && item.isCorrect ? "correct" : selectedAnswer && !selectedAnswer.isCorrect && index === selectedAnswer.index ? "wrong" : ""}
                    `}
                    onClick={() => onSelectAnswer(item, index)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>

            </div>
          </>
        )}

      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI
              type="primary"
              onClick={onNext}
            >
              {showResult ? "Попробовать еще" : "Далее"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  )
}