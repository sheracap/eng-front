import React, { FC, useEffect } from "react";
import { $deleteLesson, $lessonsByChapter } from "#stores/lessons";
import { useStore } from "effector-react";
import { ButtonUI } from "#ui/button";
import { useModalControl } from "#hooks/useModalControl";
import { ModalUI } from "#ui/modal";
import {
  AddLessonModal,
  AddLessonModalPropTypes
} from "#src/app/sections/lessons/my/addModal";
import { Link, useHistory } from "react-router-dom";
import { AddPlusSvgIcon, DeleteIcon, EditSvgIcon } from "#src/assets/svg";
import { notificationSuccess, notificationWarning } from "#ui/notifications";
import { ContextPopover } from "#ui/contextPopover";
import { Popconfirm } from "antd";

type PropsTypes = {
  courseId: number;
  chapterId: number;
  isLessonPage?: boolean;
  activeLessonId?: number;
  isPrivate: boolean;
  isMine: boolean;
}

export const ChapterLessons: FC<PropsTypes> = (props) => {
  const { courseId, chapterId, isLessonPage, activeLessonId, isPrivate, isMine } = props;

  const history = useHistory();

  const lessonsByChapterState = useStore($lessonsByChapter.store);
  const deleteLessonState = useStore($deleteLesson.store);

  const addLessonModalControl = useModalControl<AddLessonModalPropTypes>();

  useEffect(() => {
    if (!lessonsByChapterState.data[chapterId]) {
      $lessonsByChapter.effect(chapterId);
    }
  }, []);

  useEffect(() => {
    if (deleteLessonState.data) {
      notificationSuccess("Урок удален", "");

      $lessonsByChapter.update({
        ...lessonsByChapterState,
        data: {
          ...lessonsByChapterState.data,
          [chapterId]: lessonsByChapterState.data[chapterId].filter((item) => item.id !== deleteLessonState.data)
        }
      });

      $deleteLesson.reset();
    }
  }, [deleteLessonState.data]);

  const onAddLesson = () => {
    if (lessonsByChapterState.data[chapterId].length === 10) {
      notificationWarning("Максимальное кол-во уроков в главе 10", "");
    } else {
      addLessonModalControl.openModal({ chapterId, isPrivate });
    }
  }

  const onDelete = (id: number) => {
    $deleteLesson.effect(id);
  }

  return (
    <div className="chapter-lessons-wrap">
      {!isLessonPage && (
        <div className="flex-justify">
          <h2>Уроки</h2>
          {isMine && (
            <>
              <ButtonUI
                type="primary"
                withIcon
                size="small"
                onClick={onAddLesson}
              >
                <AddPlusSvgIcon /> Добавить урок
              </ButtonUI>
              <ModalUI
                open={addLessonModalControl.modalProps.open}
                onCancel={addLessonModalControl.closeModal}
              >
                <AddLessonModal
                  modalControl={addLessonModalControl}
                  afterAdd={(item) => {
                    $lessonsByChapter.update({
                      ...lessonsByChapterState,
                      data: {
                        ...lessonsByChapterState.data,
                        [chapterId]: [ ...lessonsByChapterState.data[chapterId], item ]
                      }
                    });
                  }}
                  afterUpdate={(id, name) => {
                    $lessonsByChapter.update({
                      ...lessonsByChapterState,
                      data: {
                        ...lessonsByChapterState.data,
                        [chapterId]: lessonsByChapterState.data[chapterId].map((item) => ({
                          ...item,
                          name: item.id === id ? name : item.name
                        }))
                      }
                    });
                  }}
                />
              </ModalUI>
            </>
          )}
        </div>
      )}
      <div className="chapter-lessons">
        {lessonsByChapterState.data[chapterId] && (
          <>
            {lessonsByChapterState.data[chapterId].map((item, index) => (
              <div
                className={`chapter-lessons__item ${activeLessonId === item.id ? "active": ""}`}
                key={item.id}
              >
                <Link
                  className="chapter-lessons__item__name"
                  to={`/courses/${courseId}/lesson/${item.id}/1`}
                >
                  {index + 1}.&nbsp; {item.name}
                </Link>
                <div>
                  {isMine && (
                    <ContextPopover
                      content={(
                        <>
                          <div className="custom__popover__item">
                            <ButtonUI
                              withIcon
                              onClick={() => {
                                addLessonModalControl.openModal({ lessonDetails: item, chapterId, isPrivate });
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
                                loading={deleteLessonState.loading}
                              >
                                <DeleteIcon /> Удалить
                              </ButtonUI>
                            </Popconfirm>
                          </div>
                        </>
                      )}
                    />
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
};