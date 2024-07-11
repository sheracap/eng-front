import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { $courseChapters, $updateChaptersOrder } from "#stores/courses";
import { CourseChapterItemModel } from "#businessLogic/models/courses";
import { useModalControl } from "#hooks/useModalControl";
import { ModalUI } from "#ui/modal";

import { AddChapterModal, AddChapterModalPropTypes } from "./addChapterModal";
import { ButtonUI } from "#ui/button";
import { notificationSuccess } from "#ui/notifications";
import { AddPlusSvgIcon, BurgerMenuSvgIcon, DeleteIcon, EditSvgIcon, SwapIcon } from "#src/assets/svg";
import { CollapseUI } from "#ui/collapse";
import { ChapterLessons } from "./lessons";
import { Popconfirm } from "antd";
import { ContextPopover } from "#ui/contextPopover";
import { $deleteChapter } from "#stores/chapter";

type PropsTypes = {
  courseId: number;
  isPrivate: boolean;
  isMine: boolean;
}

export const CourseDetailsChapters: FC<PropsTypes> = (props) => {
  const { courseId, isPrivate, isMine } = props;

  const courseChaptersState = useStore($courseChapters.store);
  const updateChaptersOrderState = useStore($updateChaptersOrder.store);
  const deleteChapterState = useStore($deleteChapter.store);

  const [chapters, setChapters] = useState<Array<CourseChapterItemModel>>([]);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const [chapterOrderChangeMode, setChapterOrderChangeMode] = useState(false);

  const addChapterModalControl = useModalControl<AddChapterModalPropTypes>();

  const getChapters = () => {
    $courseChapters.effect(courseId);
  };

  useEffect(() => {
    if (courseChaptersState.data) {
      setChapters(courseChaptersState.data);
    }
  }, [courseChaptersState.data]);

  useEffect(() => {
    if (updateChaptersOrderState.success) {
      notificationSuccess("Успешно", "Порядок сохранен");
      $updateChaptersOrder.reset();
      setIsOrderChanged(false);
      setChapterOrderChangeMode(false);
      getChapters();
    }
  }, [updateChaptersOrderState.success]);

  useEffect(() => {
    if (deleteChapterState.data) {
      notificationSuccess("Глава удалена", "");
      $deleteChapter.reset();
      getChapters();
    }
  }, [deleteChapterState.data]);

  const onDelete = (id: number) => {
    $deleteChapter.effect(id);
  }

  const handleDragAndDrop = (results) => {
    const { source, destination } = results;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const reorderedchapters = [...chapters];

    const chaptersourceIndex = source.index;
    const storeDestinatonIndex = destination.index;

    const [removedStore] = reorderedchapters.splice(chaptersourceIndex, 1);
    reorderedchapters.splice(storeDestinatonIndex, 0, removedStore);

    setIsOrderChanged(true);

    return setChapters(reorderedchapters);
  };

  const onCancelSaveOrders = () => {
    setIsOrderChanged(false);
    setChapterOrderChangeMode(false);
    setChapters(courseChaptersState.data);
  };

  const onSaveOrders = () => {
    const data = {};

    chapters.forEach((item, index) => {
      if (String(courseChaptersState.data[index].id) !== String(item.id)) {
        data[item.id] = index + 1;
      }
    });

    if (Object.keys(data).length) {
      $updateChaptersOrder.effect({
        courseId,
        data
      });
    } else {
      notificationSuccess("Успешно", "Порядок сохранен");
      setIsOrderChanged(false);
      setChapterOrderChangeMode(false);
    }
  };

  return (
    <>
      <div className="course-details__chapters content-block">
        {chapters.length > 0 && (
          <>
            <div className="course-details__chapters__name">
              <div>Главы</div>
              <div>
                {(isMine && !chapterOrderChangeMode && chapters.length > 1) && (
                  <ButtonUI
                    type="primary"
                    withIcon
                    size="small"
                    onClick={() => setChapterOrderChangeMode(!chapterOrderChangeMode)}
                  >
                    <SwapIcon /> Поменять порядок
                  </ButtonUI>
                )}
                <ButtonUI
                  type="primary"
                  withIcon
                  size="small"
                  onClick={() => addChapterModalControl.openModal({ courseId })}
                >
                  <AddPlusSvgIcon /> Добавить главу
                </ButtonUI>
              </div>
            </div>
            {chapterOrderChangeMode && (
              <div className="course-details__chapters__order-mode">
                <div className="course-details__chapters__list">
                  <DragDropContext onDragEnd={handleDragAndDrop}>
                    <Droppable droppableId="ROOT" type="group">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {chapters.map((item, index) => (
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
                                  <div className="course-details__chapters__list__item">
                                    <div className="course-details__chapters__list__item__name">{item.name}</div>
                                    <div className="course-details__chapters__list__item__drag">
                                      <BurgerMenuSvgIcon />
                                    </div>
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
                </div>
              </div>
            )}
          </>
        )}
        {!chapterOrderChangeMode && (
          <div className="course-details__chapters__list">
            <CollapseUI>
              {chapters.map((item) => (
                <CollapseUI.Item
                  key={item.id}
                  header={(
                    <div className="course-details__chapters__list__item">
                      <div className="course-details__chapters__list__item__name">{item.name}</div>
                      {isMine && (
                        <div className="course-details__chapters__list__item__actions">
                          <ContextPopover
                            content={(
                              <>
                                <div className="custom__popover__item">
                                  <ButtonUI
                                    withIcon
                                    onClick={() => {
                                      addChapterModalControl.openModal({ chapterDetails: item, courseId });
                                    }}
                                  >
                                    <EditSvgIcon /> Редактировать
                                  </ButtonUI>
                                </div>
                                <div className="custom__popover__item">
                                  <Popconfirm
                                    title="Вы уверены, что хотите удалить урок ?"
                                    onConfirm={() => {
                                      onDelete(item.id)
                                    }}
                                    okText="Да"
                                    cancelText="Нет"
                                  >
                                    <ButtonUI
                                      danger
                                      withIcon
                                      loading={deleteChapterState.loading}
                                    >
                                      <DeleteIcon /> Удалить
                                    </ButtonUI>
                                  </Popconfirm>
                                </div>
                              </>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  )}
                >
                  <ChapterLessons courseId={courseId} chapterId={item.id} isPrivate={isPrivate} isMine={isMine} />
                </CollapseUI.Item>
              ))}
            </CollapseUI>
          </div>
        )}
      </div>


      <ModalUI
        open={addChapterModalControl.modalProps.open}
        onCancel={addChapterModalControl.closeModal}
      >
        <AddChapterModal
          modalControl={addChapterModalControl}
          callback={() => getChapters()}
        />
      </ModalUI>

      {isMine && (
        <div className={`actions-save-panel ${chapterOrderChangeMode ? "active" : ""}`}>
          <div className="actions-save-panel__in flex-center">
            <ButtonUI
              danger
              onClick={onCancelSaveOrders}
              disabled={updateChaptersOrderState.loading}
            >
              Отмена
            </ButtonUI>
            <ButtonUI
              type="primary"
              onClick={onSaveOrders}
              loading={updateChaptersOrderState.loading}
              disabled={!isOrderChanged}
            >
              Сохранить
            </ButtonUI>
          </div>
        </div>
      )}
    </>
  )
};