import React, { FC, useMemo, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Progress } from "antd";

import { ExerciseItemModel } from "#businessLogic/models/section";


import styles from "./styles.module.scss";
import { shuffledArray } from "#utils/index";
import { ClearSvgIcon } from "#src/assets/svg";
import { ButtonUI } from "#ui/button";
import { notificationWarning } from "#ui/notifications";

type FilledItemsType = {
  [key: string]: {
    word: string;
    isCorrect: boolean;
    draggableId: string;
  }
}

type UsedAnswersType = {
  [key: string]: boolean;
}

type PropsTypes = {
  data: ExerciseItemModel
}

export const TemplateFillImages: FC<PropsTypes> = (props) => {
  const { data } = props;

  const [filledItems, setFilledItems] = useState<FilledItemsType>({});
  const [usedAnswers, setUsedAnswers] = useState<UsedAnswersType>({});
  const [showResults, setShowResults] = useState(false);
  const correctAnswersCount = useRef(0);

  const answer = useMemo(() => {
    return shuffledArray(JSON.parse(data.metaData.answer));
  }, []);

  const pictures = useMemo(() => {
    return JSON.parse(data.metaData.value);
  }, []);

  const handleDragAndDrop = (results) => {
    const { draggableId, source, destination } = results;

    if (destination) {
      if (destination.droppableId !== "ROOT") {
        const draggableWord = draggableId.substring(0, draggableId.length - String(source.index).length - 1);
        const destinationWord = destination.droppableId.substring(0, destination.droppableId.length - String(destination.index).length - 1);
        const isCorrect = destinationWord === draggableWord;

        const newFilledItems = { ...filledItems };
        const newUsedAnswers = { ...usedAnswers };

        if (newFilledItems[destination.droppableId]) {
          const currentUsedDraggableId = newFilledItems[destination.droppableId].draggableId;

          if (!isCorrect) {
            correctAnswersCount.current = correctAnswersCount.current - 1;
          }

          delete newUsedAnswers[currentUsedDraggableId];

        } else {
          if (isCorrect) {
            correctAnswersCount.current = correctAnswersCount.current + 1;
          }
        }

        newUsedAnswers[draggableId] = true;

        newFilledItems[destination.droppableId] = {
          word: draggableWord,
          isCorrect,
          draggableId
        }

        setUsedAnswers(newUsedAnswers);
        setFilledItems(newFilledItems);
      }
    } else {
      return;
    }
  };

  const onClearField = (fieldName: string) => {
    const newUsedAnswers = { ...usedAnswers };
    const newFilledItems = { ...filledItems };

    if (newFilledItems[fieldName].isCorrect) {
      correctAnswersCount.current = correctAnswersCount.current - 1;
    }

    delete newUsedAnswers[newFilledItems[fieldName].draggableId];
    delete newFilledItems[fieldName];

    setUsedAnswers(newUsedAnswers);
    setFilledItems(newFilledItems);
  };


  const onCheckResult = () => {
    if (answer.length === Object.keys(filledItems).length) {
      setShowResults(true);
    } else {
      notificationWarning("Заполните все поля", "");
    }
  }


  return (
    <>
      <div className={styles.fillPicturesTemplateWrap}>

        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div>
            <Droppable droppableId="ROOT" direction="horizontal">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className={styles.blankAnswers}>
                  {answer.map((item, index) => (
                    <Draggable
                      draggableId={item + index}
                      index={index}
                      key={item + index}
                      isDragDisabled={!!usedAnswers[item + index]}
                    >
                      {(provided, snapshot) => (
                        <div className={`${styles.blankAnswerItemWr} ${!!usedAnswers[item + index] ? styles.hiddenItem : ""}`}>

                          <div className={`${styles.blankAnswerItem} ${styles.hiddenItem}`}>
                            {item.substring(1, item.length - 1)}
                          </div>

                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className={`${styles.blankAnswerItem} ${styles.blankAnswerItemDrag} ${snapshot.isDragging ? "active" : "" }`}
                          >
                            {item.substring(1, item.length - 1)}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                </div>
              )}
            </Droppable>
          </div>


          <div className={styles.fillPicturesTemplate}>
            {pictures.map((item, index) => (
              <div className={styles.fillPicturesTemplateItem} key={index}>
                <div className={styles.fillPicturesTemplateItemPic}>
                  <img src={item.pic} alt="" />
                </div>
                <Droppable droppableId={`${item}${index}`}>
                  {(provided, snapshot) => (
                    <div
                      className={`
                          ${styles.blankTemplateTextInput} ${snapshot.isDraggingOver ? "drag-over" : ""}
                          show-answer_${showResults}
                          is-correct-blank-answer_${!!filledItems[item + String(index)]?.isCorrect}
                        `}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {filledItems[`${item}${index}`] && (
                        <div>
                          {filledItems[`${item}${index}`].word}
                          {!showResults && (
                            <div
                              className={styles.blankTemplateTextInputClearBtn}
                              onClick={() => onClearField(`${item}${index}`)}
                            >
                              <ClearSvgIcon />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
      {showResults ? (
        <div className={styles.result}>
          <BlankProgress result={correctAnswersCount.current} total={answer.length} />
        </div>
      ) : (
        <div className={styles.testTemplateActions}>
          <ButtonUI onClick={onCheckResult}>
            Проверить
          </ButtonUI>
        </div>
      )}
    </>
  )
};

export const BlankProgress: FC<{ result: number; total: number; }> = (props) => {
  const { result, total } = props;

  const percent = Number((result * 100 / total).toFixed(0));

  return (
    <div>
      <Progress
        type="circle"
        width={80}
        strokeColor={"#009f3c"}
        percent={percent}
        format={(percent) => (
          <div className={styles.blankResultProgress}>
            <div>{percent}%</div>
            <span>{result} из {total}</span>
          </div>
        )}
      />
    </div>
  )
};