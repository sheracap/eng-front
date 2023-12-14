import React, { FC, useMemo } from "react";

import { ExerciseItemModel } from "#businessLogic/models/section";

import { serialize } from "#src/components/richTextEditor/pasteHtml";

import { isJsonString } from "#utils/index";

import styles from "./styles.module.scss";

type PropsTypes = {
  data: ExerciseItemModel
}

export const TemplateTextBlock: FC<PropsTypes> = (props) => {
  const { data } = props;

  const text = useMemo(() => {
    if (!data.value) {
      return "";
    }

    if (isJsonString(data.value)) {
      const nodes = JSON.parse(data.value);

      return Array.isArray(nodes) ? nodes.map((n) => serialize(n)).join('\n') : "";
    }

    return data.value;
  }, [data.value]);

  return (
    <div className={styles.textBlockTemplate}>
      {text && <div>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>}
    </div>
  )
};