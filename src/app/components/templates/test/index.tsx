import React, { FC, useState } from "react";
import { useStore } from "effector-react";
import { Radio, Space } from "antd";

import { $addExerciseAnswer } from "#stores/exercise";
import { $exerciseAnswers } from "#src/app/sections/lessons/details/effector";

import { ExerciseItemModel } from "#businessLogic/models/section";

import { useRole } from "#hooks/useRole";

import { ButtonUI } from "#ui/button";

import styles from "./styles.module.scss";

type PropsTypes = {
  data: ExerciseItemModel;
  showHints: boolean;
}

export const TemplateTest: FC<PropsTypes> = (props) => {
  const { data, showHints } = props;

  const exerciseAnswersState = useStore($exerciseAnswers.store);

  const [userAnswer, setUserAnswer] = useState<string | undefined>(undefined);

  const result = exerciseAnswersState[data.sectionId] ? exerciseAnswersState[data.sectionId][data.id] : undefined;

  const { isStudent } = useRole();

  const onAnswerChange = (e) => {
    if (!result) {
      const val = e.target.value;

      setUserAnswer(val);
    }
  };

  const onCheck = () => {
    let res;

    if (String(userAnswer) === String(data.metaData.answer)) {
      res = { text: "Правильно", type: "CORRECT", val: userAnswer };
    } else {
      res = { text: "Неправильно", type: "WRONG", val: userAnswer };
    }

    $addExerciseAnswer.effect({
      sectionId: data.sectionId,
      exerciseId: data.id,
      metaData: res
    }).then((response) => {
      if (response) {
        $exerciseAnswers.update({
          [data.sectionId]: {
            ...exerciseAnswersState[data.sectionId],
            [data.id]: res
          }
        });
      }
    });
  };

  return (
    <div className={styles.testTemplate}>
      <div className={styles.testQuestion}>{data.metaData.question}</div>
      <div className={styles.testVariants}>
        {data.metaData.variants && (
          <Radio.Group value={result ? result.val : userAnswer} onChange={onAnswerChange}>
            <Space direction="vertical">
              {data.metaData.variants.map((item, index) => (
                <Radio
                  className={(showHints || result) && item === data.metaData.answer ? "correct-answer" : ""}
                  value={item}
                  key={index}
                >
                  {item}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        )}
      </div>
      {isStudent && (
        <>
          {result ? (
            <div className={styles.result} datatype={result.type}>
              {result.text}
            </div>
          ) : (
            <div className={styles.testTemplateActions}>
              <ButtonUI onClick={onCheck}>Проверить</ButtonUI>
            </div>
          )}
        </>
      )}
    </div>
  )
};