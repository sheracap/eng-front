import React, { FC, useEffect, useState } from "react";
import { Progress } from "antd";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import { ModalUI } from "#ui/modal";
import { ButtonUI } from "#ui/button";

import { WordItemModel } from "#businessLogic/models/vocabulary";
import { shuffledArray } from "#utils/index";
import { notificationWarning } from "#ui/notifications";
import { TestResult } from "../components/testResult";
import { MicrophoneIcon } from "#src/assets/svg";

type PropsTypes = {
  words: Array<WordItemModel>;
}

export const PronunciationEx: FC<PropsTypes> = (props) => {
  const { words } = props;

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState(shuffledArray(words));

  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    startListening();

    return () => {
      stopListening();
      resetTranscript();
    }
  }, []);

  useEffect(() => {



  }, [currentIndex]);

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const onNext = () => {
    if (showResult) {
      setShowResult(false);
      setCorrectAnswersCount(0);
      setCurrentIndex(0);

      return;
    }

    if (!transcript) {
      notificationWarning("Произнесите слово", "");
      return;
    } else if (transcript === shuffledWords[currentIndex].value) {
      setCorrectAnswersCount((prevState) => prevState + 1);
    }

    resetTranscript();


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
          <div className="words-pronunciation-exercise-wrap">
            <div>
              <Progress
                percent={showResult ? 100 : Number((currentIndex * 100 / shuffledWords.length).toFixed(0))}
              />

              {currentIndex} / {shuffledWords.length}
            </div>
            <div className="words-pronunciation-exercise">
              <div className="words-pronunciation-exercise__value">{shuffledWords[currentIndex].value}</div>

              <div className="words-pronunciation-exercise__answer">
                {listening && !transcript && (
                  <div className="words-pronunciation-exercise__answer__mic">
                    <div className="words-pronunciation-exercise__answer__mic__icon">
                      <MicrophoneIcon />
                    </div>
                    <div className="words-pronunciation-exercise__answer__mic__title">Говорите</div>
                  </div>
                )}

                <div>{transcript}</div>
              </div>

            </div>
          </div>
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