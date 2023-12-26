import React, { FC, useMemo } from "react";
import { ExerciseItemModel } from "#businessLogic/models/section";

import styles from "./styles.module.scss";

type PropsTypes = {
  data: ExerciseItemModel
}

export const TemplateFillText: FC<PropsTypes> = (props) => {
  const { data } = props;

  const text = useMemo(() => {
    return JSON.parse(data.value);
  }, []);

  return (
    <div className={styles.fillTextTemplate}>
      {text.map((item, index) => (
        <React.Fragment key={index}>
          {item[0] === "[" && (
            <span className={styles.fillTextInput} contentEditable={true} />
          )}

          {item[0] !== "[" && (
            <span dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, "<br />")}}></span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}