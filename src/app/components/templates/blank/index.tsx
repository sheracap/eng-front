import React, { FC, useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { ExerciseItemModel } from "#businessLogic/models/section";


import styles from "./styles.module.scss";

type PropsTypes = {
  data: ExerciseItemModel
}

const testAnswer = [
  "asddasdasdasdasd",
  "fdsfdf",
  "sdfsdf",
  "hfghfg",
  "fhfgh",
  "sdfsdfhghjghj",
  "fghfgh",
  "Hfghgfhfghffhfghhf",
  "jghjghjgjj",
  "hjkjhkjhkhjk",
  "hjkjhkjhk"
];

export const TemplateBlank: FC<PropsTypes> = (props) => {
  const { data } = props;

  const [filledItems, setFilledItems] = useState({});

  const text = JSON.parse(data.value);
  const answer = JSON.parse(data.answer); // перемешать порядок ответов

  const handleDragAndDrop = (results) => {
    const { draggableId, source, destination } = results;


    // if (destination) {
    //   if (destination.droppableId === "ROOT") {
    //
    //   } else {
    //     const word = itemsInit.find((wordItem) => String(wordItem.id) === draggableId);
    //
    //     if (word) {
    //       const newItems = items.filter((item) => item.id !== word.id);
    //
    //       if (filledItems[destination.droppableId]) {
    //         newItems.unshift(filledItems[destination.droppableId]);
    //       }
    //
    //       setItems(newItems);
    //     }
    //
    //     setFilledItems({
    //       ...filledItems,
    //       [destination.droppableId]: word
    //     });
    //   }
    // } else {
    //   return;
    // }
  };


  return (
    <div className={styles.blankTemplate}>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <div>
          {/*<div className={styles.blankAnswers}>*/}
          {/*  {answer.map((item, index) => (*/}
          {/*    <div key={index}>*/}
          {/*      <Droppable droppableId={item} direction="horizontal">*/}
          {/*        {(provided, snapshot) => (*/}
          {/*          <div {...provided.droppableProps} ref={provided.innerRef}>*/}
          {/*            <Draggable*/}
          {/*              draggableId={item}*/}
          {/*              index={index}*/}
          {/*              key={item}*/}
          {/*            >*/}
          {/*              {(provided) => (*/}
          {/*                <div*/}
          {/*                  {...provided.dragHandleProps}*/}
          {/*                  {...provided.draggableProps}*/}
          {/*                  ref={provided.innerRef}*/}
          {/*                  className={styles.blankAnswerItem}*/}
          {/*                >*/}
          {/*                  <div>*/}
          {/*                    {item.substring(1, item.length - 1)}*/}
          {/*                  </div>*/}
          {/*                </div>*/}
          {/*              )}*/}
          {/*            </Draggable>*/}
          {/*          </div>*/}
          {/*        )}*/}
          {/*      </Droppable>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}

          <Droppable droppableId="ROOT" direction="horizontal">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={styles.blankAnswers}>
                {testAnswer.map((item, index) => (
                  <Draggable
                    draggableId={item}
                    index={index}
                    key={item + index}

                  >
                    {(provided, snapshot) => (
                      <div className={styles.blankAnswerItemWr}>

                        <div className={styles.blankAnswerItem} style={{ opacity: 0 }}>
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

        <div className={styles.blankTemplateText}>
          {text.map((item, index) => (
            <React.Fragment key={index}>
              {item[0] === "[" && (
                <Droppable droppableId={item} type="vertical" >
                  {(provided, snapshot) => (
                    <div
                      className={`${styles.blankTemplateTextInput} ${snapshot.isDraggingOver ? "drag-over" : ""}`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {filledItems[item] && (
                        <div>
                          {filledItems[item]}
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              )}

              {item[0] !== "[" && (
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, "<br />")}}></span>
              )}

              {/*{item[0] === "["*/}
              {/*  ? item.substring(1, item.length - 1)*/}
              {/*  : <span dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, "<br />")}}></span>*/}
              {/*}*/}
            </React.Fragment>
          ))}
        </div>



      </DragDropContext>
    </div>
  )
};