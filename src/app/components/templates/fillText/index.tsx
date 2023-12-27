import React, { FC, useMemo, useRef } from "react";
import { ExerciseItemModel } from "#businessLogic/models/section";

import styles from "./styles.module.scss";

type PropsTypes = {
  data: ExerciseItemModel
}

export const TemplateFillText: FC<PropsTypes> = (props) => {
  const { data } = props;

  const answer = useRef({});

  const text = useMemo(() => {
    return JSON.parse(data.value);
  }, []);

  const onChange = (e) => {
    const key = 0;
    const item = "";
    const value = e.currentTarget.textContent;


    answer.current = {
      ...answer.current,
      [key]: {
        value,
        isCorrect: item === value
      }
    };

  };

  return (
    <div className={styles.fillTextTemplate}>
      {text.map((item, index) => (
        <React.Fragment key={index}>
          {item[0] === "[" && (
            <span className={styles.fillTextInput} onInput={onChange} data-val={{ index, item }} contentEditable={true} />
          )}

          {item[0] !== "[" && (
            <span dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, "<br />")}}></span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}