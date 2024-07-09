import React, { FC, useEffect, useRef, useState } from "react";
import { ExerciseItemModel } from "#businessLogic/models/section";

import styles from "./styles.module.scss";
import { debounce } from "#utils/debounceLodash";
import { ButtonUI } from "#ui/button";
import { notificationWarning } from "#ui/notifications";
import { BlankProgress } from "#components/templates/blank";
import { useRole } from "#hooks/useRole";

type PropsTypes = {
  data: ExerciseItemModel;
  showHints: boolean;
  answersState: any;
  onCreateExerciseAnswer: (id: any, res: any, prevState: any) => void;
}

export const withDebounce = debounce(
  (action: any) => {
    action();
  },
  500,
  false,
);

export const TemplateFillText: FC<PropsTypes> = (props) => {
  const { data, showHints, answersState, onCreateExerciseAnswer } = props;

  const [showResults, setShowResults] = useState(false);
  const filledAnswers = useRef({});
  const correctAnswersCount = useRef(0);

  const { isStudent } = useRole();

  useEffect(() => {
    if (!showResults && answersState && answersState[data.id]) {
      const answerData = answersState[data.id];

      correctAnswersCount.current = answerData.correctAnswersCount;
      filledAnswers.current = answerData.filledAnswers;

      setShowResults(true);
    }
  }, [answersState]);

  const onChange = (e) => {
    const { index, item } = JSON.parse(e.currentTarget.getAttribute("data-val"));
    const value = e.currentTarget.textContent;

    withDebounce(() => {
      filledAnswers.current = {
        ...filledAnswers.current,
        [index]: {
          isCorrect: item === `[${value}]`,
          value
        }
      };
    });
  };

  const onCheckResult = () => {
    if (data.metaData.answer.length === Object.keys(filledAnswers).length) {

      let count = 0;

      Object.entries(filledAnswers).forEach(([_, item]) => {
        if (item.isCorrect) {
          count = count + 1;
        }
      });

      correctAnswersCount.current = count;

      const metaData = {
        correctAnswersCount: count,
        filledAnswers: filledAnswers.current
      }

      onCreateExerciseAnswer(data.id, metaData, answersState);
    } else {
      notificationWarning("Заполните все поля", "");
    }
  }

  return (
    <>
      <div className={styles.fillTextTemplate}>
        {data.metaData.resultArray.map((item, index) => (
          <React.Fragment key={index}>
            {item[0] === "[" && (
              <>
                {showResults ? (
                  <span
                    className={`
                    ${styles.fillTextInput}
                    is-correct-blank-answer_${!!filledAnswers.current[index]?.isCorrect}
                  `}
                  >
                    {filledAnswers.current[index]?.value}
                  </span>
                ) : (
                  <span>
                    {showHints ? (
                      <span className={`${styles.fillTextInput}`}>
                        {item.substring(1, item.length - 1)}
                      </span>
                    ) : (
                      <span
                        className={`${styles.fillTextInput}`}
                        onInput={onChange}
                        data-val={JSON.stringify({ index, item })}
                        contentEditable={true}
                      />
                    )}
                  </span>
                )}
              </>
            )}

            {item[0] !== "[" && (
              <>
                {item === "&separator" ? <br /> : <span> {item} </span>}
              </>
            )}
          </React.Fragment>
        ))}
      </div>
      {isStudent && (
        <>
          {showResults ? (
            <div className={styles.result}>
              <BlankProgress result={correctAnswersCount.current} total={data.metaData.answer.length} />
            </div>
          ) : (
            <div className={styles.testTemplateActions}>
              <ButtonUI onClick={onCheckResult}>
                Проверить
              </ButtonUI>
            </div>
          )}
        </>
      )}
    </>
  )
}