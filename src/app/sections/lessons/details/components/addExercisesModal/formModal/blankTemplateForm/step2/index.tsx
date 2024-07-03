import React, { useEffect, useState } from "react";

import "./styles.scss";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { ArrowBackSvgIcon } from "#src/assets/svg";

const punctuations = {
  ".": true,
  ",": true,
  "?": true,
  "!": true,
  ":": true,
  "{": true,
  "}": true
}

function mergeWords(arr) {
  if (!arr) {
    return [];
  }

  const result: any = [];
  let temp = '';

  arr.forEach((word, index) => {

    if (word.startsWith('[') && word.endsWith(']')) {
      if (temp) {
        result.push(temp.trim());
        temp = '';
      }

      result.push(word);
    } else {
      temp = temp + (word !== "." ? ' ' + word : word);
    }
  });

  if (temp) {
    result.push(temp.trim());
  }

  return result;
}

export const BlankTemplateFormStep2 = (props) => {
  const { text, onFinish, setStep, isEditMode } = props;

  const [processedText, setProcessedText] = useState<any>([]);
  const [selectedWords, setSelectedWords] = useState({});

  useEffect(() => {
    const lines = text.split("\n");

    const words = lines.map(line => {
      return line.match(/(\[[^\]]*\]|\b\w+['’]?\w*|[.,!?;:])/g);
    });

    const newSelectedWords = {};

    words.forEach((line, lIdx) => {
      if (line) {
        line.forEach((word, wIdx) => {
          if (word.startsWith("[") && word.endsWith("]")) {
            newSelectedWords[`${lIdx}${wIdx}`] = word;
          }
        });
      }
    });

    setSelectedWords(newSelectedWords);

    setProcessedText(words);
  }, []);

  const handleWordClick = (word, lineIndex, wordIndex) => {
    const newSelectedWords = {...selectedWords};

    let newProcessedText = [...processedText];

    if (selectedWords[`${lineIndex}${wordIndex}`]) {

      newProcessedText[lineIndex][wordIndex] = word.slice(1, -1);

      delete newSelectedWords[`${lineIndex}${wordIndex}`];
    } else {
      const val = `[${word}]`;

      newProcessedText[lineIndex][wordIndex] = val;

      newSelectedWords[`${lineIndex}${wordIndex}`] = val;
    }

    setSelectedWords(newSelectedWords);

    setProcessedText(newProcessedText);
  };

  const handleFinishClick = () => {
    const result = processedText.reduce((acc, line, lineIndex) => {

      let newVal = [...acc];

      if (lineIndex > 0) {
        newVal.push("&separator");
      }

      newVal = [...newVal, ...mergeWords(line)]

      //const regex = /\[[^\]]+\]|\b[^\[\]]+\b/g;

      //newVal = [...newVal, ...line.join(" ").match(regex)];

      return newVal;
    }, []);

    onFinish(Object.values(selectedWords), result);
  };

  return (
    <>
      <ModalUI.Middle>
        <div className="blank-text-step2">
          {processedText.map((line, lineIndex) => (
            <div key={lineIndex}>
              {line ? line.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  onClick={() => {
                    if (!punctuations[word]) {
                      handleWordClick(word, lineIndex, wordIndex)
                    }
                  }}
                  className={`${punctuations[word] ? "point-sym" : ""} ${word.startsWith("[") && word.endsWith("]") ? "active" : ""}`}
                >
                  {word}&nbsp;
                </span>
              )) : <br />}
            </div>
          ))}
        </div>
      </ModalUI.Middle>


      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI onClick={() => setStep(1)} withIcon fullWidth>
              <ArrowBackSvgIcon /> Назад
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI
              type="primary"
              onClick={handleFinishClick}
              fullWidth
            >
              {isEditMode ? "Сохранить" : "Добавить"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  )
}