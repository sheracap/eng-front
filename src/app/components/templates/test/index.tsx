import React, { useState } from "react";

import styles from "./styles.module.scss";
import { ButtonUI } from "#ui/button";
import { Radio, Space } from "antd";

export const TemplateTest = (props) => {
  const { data } = props;

  const [userAnswer, setUserAnswer] = useState(undefined);
  const [result, setResult] = useState<any>(undefined);

  const onAnswerChange = (e) => {
    const val = e.target.value;

    setUserAnswer(val);
  };

  const onCheck = () => {
    let res;

    if (String(userAnswer) === String(data.answer)) {
      res = { text: "Правильно", type: "CORRECT" };
    } else {
      res = { text: "Неправильно", type: "WRONG" };
    }

    setResult(res);
  };

  return (
    <div className={styles.testTemplate}>
      <div className={styles.testQuestion}>{data.value}</div>
      {/*<div>*/}
      {/*  Правильный ответ: {data.answer}*/}
      {/*</div>*/}
      <div className={styles.testVariants}>
        {data.wrongAnswers && (
          <Radio.Group value={userAnswer} onChange={onAnswerChange}>
            <Space direction="vertical">
              {data.wrongAnswers.map((item, index) => (
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