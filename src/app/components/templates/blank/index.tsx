import React, { FC, useMemo } from "react";

import { ExerciseItemModel } from "#businessLogic/models/section";


import styles from "./styles.module.scss";

type PropsTypes = {
  data: ExerciseItemModel
}

export const TemplateBlank: FC<PropsTypes> = (props) => {
  const { data } = props;

  const text = JSON.parse(data.value);

  return (
    <div className={styles.textBlockTemplate}>
      {text.map((item, index) => (
        <React.Fragment key={index}>
          {item[0] === "["
            ? item.substring(1, item.length - 1)
            : <span dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, "<br />")}}></span>
          }
        </React.Fragment>
      ))}
    </div>
  )
};