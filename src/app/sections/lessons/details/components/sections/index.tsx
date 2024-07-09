import React, { FC, useEffect } from "react";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import {
  AddSectionModal,
  AddSectionModalPropTypes
} from "#src/app/sections/lessons/details/components/addSectionModal";
import { useModalControl } from "#hooks/useModalControl";
import { LessonDetailsModel } from "#businessLogic/models/lessons";
import { $lessonSections } from "#src/app/sections/lessons/details/effector";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";
import { AddPlusSvgIcon, DeleteIcon, EditSvgIcon } from "#src/assets/svg";
import { $deleteSection, $sectionDetails } from "#stores/section";

import { Popconfirm } from "antd";
import { ContextPopover } from "#ui/contextPopover";
import { notificationSuccess } from "#ui/notifications";

type PropsTypes = {
  courseId: number | undefined;
  lessonId: number;
  sections: LessonDetailsModel["sections"];
  sectionIndex: string;
  isMine: boolean;
  selectedHomeworkId: any;
}

export const LessonSections: FC<PropsTypes> = (props) => {
  const { courseId, lessonId, sections, sectionIndex, isMine, selectedHomeworkId } = props;

  const history = useHistory();

  const lessonSectionsState: any = useStore($lessonSections.store);
  const deleteSectionState = useStore($deleteSection.store);

  const addSectionModalControl = useModalControl<AddSectionModalPropTypes>();

  useEffect(() => {
    return () => {
      $lessonSections.reset();
    }
  }, []);

  useEffect(() => {
    if (sections) {
      $lessonSections.update(sections);
    }
  }, [sections]);

  useEffect(() => {
    if (deleteSectionState.data) {
      notificationSuccess("Раздел удален", "");

      const currentSectionIndex = Number(sectionIndex) - 1;

      if (String(lessonSectionsState[currentSectionIndex].id) === String(deleteSectionState.data)) {
        if (lessonSectionsState[currentSectionIndex + 1]) {
          onSectionClick(currentSectionIndex + 1);
        } else if (lessonSectionsState[currentSectionIndex - 1]) {
          onSectionClick(currentSectionIndex - 1);
        } else {
          $sectionDetails.reset();
        }
      }

      $lessonSections.update(lessonSectionsState.filter((item) => String(item.id) !== String(deleteSectionState.data)));

      $deleteSection.reset();
    }
  }, [deleteSectionState.data]);

  const onSectionClick = (index) => {
    if (courseId) {
      history.push(`/courses/${courseId}/lesson/${lessonId}/${index + 1}`);
    } else {
      history.push(`/lessons/${lessonId}/${index + 1}`);
    } // todo think
  }

  const onDelete = (id: number) => {
    $deleteSection.effect(id);
  }

  return (
    <div className="lesson-details__sections">
      <div className="lesson-details__sections__title flex-justify">
        <div>Разделы / Секции</div>
        {isMine && (
          <>
            <ButtonUI
              type="primary"
              withIcon
              size="small"
              onClick={() => addSectionModalControl.openModal({ lessonId })}
            >
              <AddPlusSvgIcon /> Добавить
            </ButtonUI>
            <ModalUI
              open={addSectionModalControl.modalProps.open}
              onCancel={addSectionModalControl.closeModal}
            >
              <AddSectionModal
                modalControl={addSectionModalControl}
              />
            </ModalUI>
          </>
        )}
      </div>
      <div className="lesson-details__sections__list">
        {lessonSectionsState.map((item, index) => (
          <div
            className={`lesson-details__sections__list__item ${Number(sectionIndex) - 1 === index && !selectedHomeworkId ? "active" : ""}`}
            key={item.id}
          >
            <div
              className="lesson-details__sections__list__item__name"
              onClick={() => onSectionClick(index)}
            >
              {item.name}
            </div>
            {isMine && (
              <ContextPopover
                content={(
                  <>
                    <div className="custom__popover__item">
                      <ButtonUI
                        withIcon
                        onClick={() => {
                          addSectionModalControl.openModal({ lessonId, sectionDetails: { id: item.id, name: item.name } });
                        }}
                      >
                        <EditSvgIcon /> Редактировать
                      </ButtonUI>
                    </div>
                    <div className="custom__popover__item">
                      <Popconfirm
                        title="Вы уверены, что хотите удалить упражнение ?"
                        onConfirm={() => {
                          onDelete(item.id)
                        }}
                        okText="Да"
                        cancelText="Нет"
                      >
                        <ButtonUI
                          danger
                          withIcon
                          loading={deleteSectionState.loading}
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
        ))}
      </div>
    </div>
  )
};