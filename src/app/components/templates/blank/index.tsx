import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Progress } from "antd";

import { ExerciseItemModel } from "#businessLogic/models/section";


import styles from "./styles.module.scss";
import { shuffledArray } from "#utils/index";
import { ClearSvgIcon } from "#src/assets/svg";
import { ButtonUI } from "#ui/button";
import { notificationWarning } from "#ui/notifications";
import { useRole } from "#hooks/useRole";
import { $addExerciseAnswer } from "#stores/exercise";
import { $exerciseAnswers } from "#src/app/sections/lessons/details/effector";
import { useStore } from "effector-react";

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
  showHints: boolean;
}

export const TemplateBlank: FC<PropsTypes> = (props) => {
  const { data, showHints } = props;

  const exerciseAnswersState = useStore($exerciseAnswers.store);

  const [filledItems, setFilledItems] = useState<FilledItemsType>({});
  const [usedAnswers, setUsedAnswers] = useState<UsedAnswersType>({});
  const [showResults, setShowResults] = useState(false);
  const [currentDraggedWord, setCurrentDraggedWord] = useState<string>("");

  const correctAnswersCount = useRef(0);

  const { isTeacher } = useRole();

  useEffect(() => {
    if (!showResults && exerciseAnswersState[data.sectionId] && exerciseAnswersState[data.sectionId][data.id]) {
      const savedFilledItems = exerciseAnswersState[data.sectionId][data.id];
      const correctCount = Object.entries(savedFilledItems).reduce((acc, [key, item]: any) => {
        if (item.isCorrect) {
          return acc + 1;
        }

        return acc;
      }, 0);

      setFilledItems(savedFilledItems);
      correctAnswersCount.current = correctCount;
      setShowResults(true);
    }
  }, [exerciseAnswersState]);

  const answer = useMemo(() => {
    return shuffledArray(data.metaData.answer);
  }, []);

  const text = useMemo(() => {
    return data.metaData.resultArray;
  }, []);

  const onDragStart = (results) => {
    if (showHints) {
      const { draggableId, source } = results;

      const draggableWord = draggableId.substring(0, draggableId.length - String(source.index).length);

      setCurrentDraggedWord(draggableWord);
    }
  }

  const handleDragAndDrop = (results) => {
    const { draggableId, source, destination } = results;

    if (showHints) {
      setCurrentDraggedWord("");
    }

    if (destination) {
      if (destination.droppableId !== "ROOT") {
        const draggableWord = draggableId.substring(1, draggableId.length - String(source.index).length - 1);
        const destinationWord = destination.droppableId.substring(1, destination.droppableId.length - String(destination.index).length - 1);
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

      $addExerciseAnswer.effect({
        sectionId: data.sectionId,
        exerciseId: data.id,
        metaData: filledItems
      }).then((response) => {
        if (response) {
          $exerciseAnswers.update({
            [data.sectionId]: {
              ...exerciseAnswersState[data.sectionId],
              [data.id]: filledItems
            }
          });
        }
      });
    } else {
      notificationWarning("Заполните все поля", "");
    }
  }

  return (
    <>
      <div className={styles.blankTemplate}>

        <DragDropContext onDragEnd={handleDragAndDrop} onDragStart={onDragStart}>
          {!showResults && (
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
          )}


          <div className={styles.blankTemplateText}>
            {text.map((item, index) => (
              <React.Fragment key={index}>
                {item[0] === "[" && (
                  <Droppable droppableId={`${item}${index}`}>
                    {(provided, snapshot) => (
                      <div
                        className={`
                          ${styles.blankTemplateTextInput} ${snapshot.isDraggingOver ? "drag-over" : ""}
                          is-filled_${!!filledItems[`${item}${index}`]}
                          show-answer_${showResults}
                          show-hints_${showHints}
                          is-correct-blank-answer_${(!!filledItems[item + String(index)]?.isCorrect) || currentDraggedWord === item}
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
                )}

                {item[0] !== "[" && (
                  <span dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, "<br />")}}></span>
                )}
              </React.Fragment>
            ))}
          </div>
        </DragDropContext>
      </div>
      {!isTeacher && (
        <>
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