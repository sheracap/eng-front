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

  const addExerciseAnswerState = useStore($addExerciseAnswer.store);
  const exerciseAnswersState = useStore($exerciseAnswers.store);

  const [userAnswer, setUserAnswer] = useState<string | undefined>(undefined);

  const result = exerciseAnswersState[data.id]?.metaData;

  const { isStudent } = useRole();

  const onAnswerChange = (e) => {
    const val = e.target.value;

    setUserAnswer(val);
  };

  const onCheck = () => {
    let res;

    if (String(userAnswer) === String(data.metaData.answer)) {
      res = { text: "Правильно", type: "CORRECT" };
    } else {
      res = { text: "Неправильно", type: "WRONG" };
    }

    $addExerciseAnswer.effect({
      sectionId: data.sectionId,
      exerciseId: data.id,
      metaData: res
    }).then((result) => {
      if (result) {
        $exerciseAnswers.update({
          [data.sectionId]: {
            ...exerciseAnswersState[data.id],
            [data.id]: res
          }
        });
      }
    });
  };

  return (
    <div className={styles.testTemplate}>
      <div className={styles.testQuestion}>{data.metaData.question}</div>
      {/*<div>*/}
      {/*  Правильный ответ: {data.answer}*/}
      {/*</div>*/}
      <div className={styles.testVariants}>
        {data.metaData.variants && (
          <Radio.Group value={userAnswer} onChange={onAnswerChange}>
            <Space direction="vertical">
              {data.metaData.variants.map((item, index) => (
                <Radio
                  className={showHints && item === data.metaData.answer ? "correct-answer" : ""}
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