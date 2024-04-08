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

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    console.log("selectedText", selectedText);

    // if (selectedText !== '') {
    //   setSelectedWord(selectedText);
    //   // Call your translation API here
    //   // For demonstration purposes, let's just set a mock translation
    //   setTranslation('TranslatedText');
    //   setShowPopup(true);
    // }
  };

  return (
    <div className={styles.textBlockTemplate} onMouseUp={handleTextSelect}>
      {text && <div>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>}
    </div>
  )
};