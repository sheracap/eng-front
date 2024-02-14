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
import { AddPlusSvgIcon } from "#src/assets/svg";

type PropsTypes = {
  courseId: number | undefined;
  lessonId: number;
  sections: LessonDetailsModel["sections"];
  sectionIndex: string;
  isMine: boolean;
}

export const LessonSections: FC<PropsTypes> = (props) => {
  const { courseId, lessonId, sections, sectionIndex, isMine } = props;

  const history = useHistory();

  const lessonSectionsState: any = useStore($lessonSections.store);

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

  const onSectionClick = (index) => {
    if (courseId) {
      history.push(`/courses/${courseId}/lesson/${lessonId}/${index + 1}`);
    } else {
      history.push(`/lesson/${lessonId}/${index + 1}`);
    }
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
                callback={(elem) => {
                  $lessonSections.update([ ...lessonSectionsState, elem ]);
                }}
              />
            </ModalUI>
          </>
        )}
      </div>
      <div className="lesson-details__sections__list">
        {lessonSectionsState.map((item, index) => (
          <div
            className={`lesson-details__sections__list__item ${Number(sectionIndex) - 1 === index ? "active" : ""}`}
            key={item.id}
            onClick={() => onSectionClick(index)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
};