import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { ModalControlType } from "#hooks/useModalControl";
import { $changeExercisesPosition } from "#stores/section";

import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { notificationSuccess } from "#ui/notifications";

import { ExerciseItemModel } from "#businessLogic/models/section";

import "./styles.scss";

export type ChangeExercisesPositionModalPropTypes = {
  lessonId: number;
  sectionId: number;
  editableExercises: Array<ExerciseItemModel>;
};

type PropTypes = {
  modalControl: ModalControlType<ChangeExercisesPositionModalPropTypes>;
  callback: () => void;
};

export const ChangeExercisesPositionModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const { closeModal, modalProps } = modalControl;

  const { lessonId, sectionId, editableExercises } = modalProps;

  const changeExercisesPositionState = useStore($changeExercisesPosition.store);

  const [exercises, setExercises] = useState<Array<ExerciseItemModel>>(editableExercises);

  useEffect(() => {
    return () => {
      $changeExercisesPosition.reset();
    };
  }, []);

  useEffect(() => {
    if (changeExercisesPositionState.success) {
      notificationSuccess("Порядок изменен", "")
      closeModal();
      callback();
    }
  }, [changeExercisesPositionState.success]);

  const onCancelClick = () => {
    closeModal();
  };

  const handleDragAndDrop = (results) => {
    const { source, destination } = results;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const reorderedExercises = [...exercises];

    const exercisesourceIndex = source.index;
    const storeDestinatonIndex = destination.index;

    const [removedStore] = reorderedExercises.splice(exercisesourceIndex, 1);
    reorderedExercises.splice(storeDestinatonIndex, 0, removedStore);

    return setExercises(reorderedExercises);
  };

  const onFinish = () => {
    const data = {};

    exercises.forEach((item, index) => {
      if (String(editableExercises[index].id) !== String(item.id)) {
        data[item.id] = index + 1;
      }
    });

    $changeExercisesPosition.effect({
      lessonId,
      sectionId,
      data
    });
  };

  return (
    <>
      <ModalUI.Loading show={changeExercisesPositionState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Изменить порядок</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="exercises-swap-list">
                {exercises.map((item, index) => (
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
                        className="exercises-swap-list__item"
                      >
                        <div>
                          {index + 1}. {item.title}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={onCancelClick}>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={() => onFinish()}>
              Сохранить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
