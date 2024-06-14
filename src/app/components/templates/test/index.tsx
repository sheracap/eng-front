import React, { FC, useState } from "react";
import { Radio, Space } from "antd";

import { ExerciseItemModel } from "#businessLogic/models/section";

import { useRole } from "#hooks/useRole";

import { ButtonUI } from "#ui/button";

import styles from "./styles.module.scss";

type PropsTypes = {
  data: ExerciseItemModel;
  showHints: boolean;
  answersState: any;
  onCreateExerciseAnswer: (id: any, res: any, prevState: any) => void;
}

export const TemplateTest: FC<PropsTypes> = (props) => {
  const { data, showHints, answersState, onCreateExerciseAnswer } = props;

  const [userAnswer, setUserAnswer] = useState<string | undefined>(undefined);

  const result = answersState ? answersState[data.id] : undefined;

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

    onCreateExerciseAnswer(data.id, res, answersState);
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