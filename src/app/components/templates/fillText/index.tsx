import React, { FC, useMemo, useRef, useState } from "react";
import { ExerciseItemModel } from "#businessLogic/models/section";

import styles from "./styles.module.scss";
import { debounce } from "#utils/debounceLodash";
import { ButtonUI } from "#ui/button";
import { notificationWarning } from "#ui/notifications";
import { BlankProgress } from "#components/templates/blank";

type PropsTypes = {
  data: ExerciseItemModel
}

export const withDebounce = debounce(
  (action: any) => {
    action();
  },
  500,
  false,
);

export const TemplateFillText: FC<PropsTypes> = (props) => {
  const { data } = props;

  const [showResults, setShowResults] = useState(false);
  const filledAnswers = useRef({});
  const correctAnswersCount = useRef(0);

  const answer = useMemo(() => {
    return JSON.parse(data.answer);
  }, []);

  const text = useMemo(() => {
    return JSON.parse(data.value);
  }, []);

  const onChange = (e) => {
    withDebounce(() => {
      const { index, item } = JSON.parse(e.currentTarget.getAttribute("data-val"));
      const value = e.currentTarget.textContent;

      filledAnswers.current = {
        ...filledAnswers.current,
        [index]: {
          isCorrect: item === `[${value}]`
        }
      };
    });
  };

  const onCheckResult = () => {
    if (answer.length === Object.keys(filledAnswers).length) {

      let count = 0;

      Object.entries(filledAnswers).forEach(([_, item]) => {
        if (item.isCorrect) {
          count = count + 1;
        }
      });

      correctAnswersCount.current = count;

      setShowResults(true);
    } else {
      notificationWarning("Заполните все поля", "");
    }
  }

  return (
    <>
      <div className={styles.fillTextTemplate}>
        {text.map((item, index) => (
          <React.Fragment key={index}>
            {item[0] === "[" && (
              <span
                className={`
                  ${styles.fillTextInput}
                  show-answer_${showResults}
                  is-correct-blank-answer_${!!filledAnswers.current[index]?.isCorrect}
                `}
                onInput={onChange}
                data-val={JSON.stringify({ index, item })}
                contentEditable={!showResults}
              />
            )}

            {item[0] !== "[" && (
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, "<br />")}}></span>
            )}
          </React.Fragment>
        ))}
      </div>
      {showResults ? (
        <div className={styles.result}>
          <BlankProgress result={correctAnswersCount.current} total={answer.length} />
        </div>
      ) : (
        <div className={styles.testTemplateActions}>
          <ButtonUI onClick={onCheckResult}>
            Проверить
          </ButtonUI>
        </div>
      )}
    </>
  )
}