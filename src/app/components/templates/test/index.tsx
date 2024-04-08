import React, { FC, useState } from "react";
import { Radio, Space } from "antd";

import { ExerciseItemModel } from "#businessLogic/models/section";

import { ButtonUI } from "#ui/button";

import styles from "./styles.module.scss";
import { useRole } from "#hooks/useRole";

type PropsTypes = {
  data: ExerciseItemModel;
  showHints: boolean;
}

export const TemplateTest: FC<PropsTypes> = (props) => {
  const { data, showHints } = props;

  const [userAnswer, setUserAnswer] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<{ text: string; type: string } | null>(null);

  const { isTeacher } = useRole();

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
      {!isTeacher && (
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