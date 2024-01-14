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
    if (!data.metaData.text) {
      return "";
    }

    if (isJsonString(data.metaData.text)) {
      const nodes = JSON.parse(data.metaData.text);

      return Array.isArray(nodes) ? nodes.map((n) => serialize(n)).join('\n') : "";
    }

    return data.metaData.text;
  }, [data.metaData.text]);

  return (
    <div className={styles.textBlockTemplate}>
      {text && <div>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>}
    </div>
  )
};