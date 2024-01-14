import React, { FC, useState } from "react";
import { Radio, Space } from "antd";

import { ExerciseItemModel } from "#businessLogic/models/section";

import { ButtonUI } from "#ui/button";

import styles from "./styles.module.scss";

type PropsTypes = {
  data: ExerciseItemModel;
}

export const TemplateTest: FC<PropsTypes> = (props) => {
  const { data } = props;

  const [userAnswer, setUserAnswer] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<{ text: string; type: string } | null>(null);

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

    setResult(res);
  };

  return (
    <div className={styles.testTemplate}>
      <div className={styles.testQuestion}>{data.metaData.question}</div>
      {/*<div>*/}
      {/*  Правильный ответ: {data.answer}*/}
      {/*</div>*/}
      <div className={styles.testVariants}>
        {data.metaData.wrongAnswers && (
          <Radio.Group value={userAnswer} onChange={onAnswerChange}>
            <Space direction="vertical">
              {data.metaData.wrongAnswers.map((item, index) => (
                <Radio value={item} key={index}>{item}</Radio>
              ))}
            </Space>
          </Radio.Group>
        )}
      </div>
      {result ? (
        <div className={styles.result} datatype={result.type}>
          {result.text}
        </div>
      ) : (
        <div className={styles.testTemplateActions}>
          <ButtonUI onClick={onCheck}>Проверить</ButtonUI>
        </div>
      )}
    </div>
  )
};