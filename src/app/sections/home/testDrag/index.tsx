import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import "./styles.scss";

const itemsInit = [
  { id: 1, name: "Hey" },
  { id: 2, name: "Hey 2" },
  { id: 3, name: "Hey 3" },
  { id: 4, name: "Hey 4" },
];

const inputString = "Some text [substring1] and more text [substring2] here.";

const regex = /(\[[^\]]+\])/g;
const resultArray = inputString.split(regex);

console.log(resultArray);

export const TestDrag = () => {
  const [items, setItems] = useState(itemsInit);
  const [filledItems, setFilledItems] = useState({});

  const handleDragAndDrop = (results) => {
    const { draggableId, source, destination } = results;


    if (destination) {
      if (destination.droppableId === "ROOT") {

      } else {
        const word = itemsInit.find((wordItem) => String(wordItem.id) === draggableId);

        if (word) {
          const newItems = items.filter((item) => item.id !== word.id);

          if (filledItems[destination.droppableId]) {
            newItems.unshift(filledItems[destination.droppableId]);
          }

          setItems(newItems);
        }

        setFilledItems({
          ...filledItems,
          [destination.droppableId]: word
        });
      }
    } else {
      return;
    }

    // if (source.droppableId === destination.droppableId && source.index === destination.index) {
    //   return;
    // }
    //
    // const reorderedchapters = [...chapters];
    //
    // const chaptersourceIndex = source.index;
    // const storeDestinatonIndex = destination.index;
    //
    // const [removedStore] = reorderedchapters.splice(chaptersourceIndex, 1);
    // reorderedchapters.splice(storeDestinatonIndex, 0, removedStore);
    //
    // setIsOrderChanged(true);
    //
    // return setChapters(reorderedchapters);
  };

  return (
    <div className="my-div">
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <div>
          <Droppable droppableId="ROOT" type="vertical" >
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? "skyblue" : "white" }}>
                {items.map((item, index) => (
                  <Draggable
                    draggableId={String(item.id)}
                    index={index}
                    key={String(item.id)}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div className="my-div__item">
                          {item.name}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="my-text">
          Hello
          <Droppable droppableId="ROOT2" type="vertical" >
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={{ width: "90px", height: "70px", backgroundColor: snapshot.isDraggingOver ? "green" : "white" }}>
                {filledItems["ROOT2"] && (
                  <div className="my-div__item">
                    {filledItems["ROOT2"].name}
                  </div>
                )}
              </div>
            )}
          </Droppable>
          world.
        </div>
      </DragDropContext>

    </div>
  )
};