import React, { FC, useEffect } from "react";
import { AddPlusSvgIcon } from "#src/assets/svg";
import { ButtonUI } from "#ui/button";
import { useModalControl } from "#hooks/useModalControl";
import { useStore } from "effector-react";
import { ModalUI } from "#ui/modal";
import { AddHomeworkModalPropTypes, AddHomeworkModal } from "./addHomeworkModal";
import { $lessonHomeworks } from "#stores/homework";
import { useHistory, useLocation } from "react-router-dom";

type PropsTypes = {
  lessonId: number;
  selectedHomeworkId: any;
}

export const LessonHomework: FC<PropsTypes> = (props) => {
  const { lessonId, selectedHomeworkId } = props;

  const history = useHistory();
  const location = useLocation();

  const lessonHomeworksState = useStore($lessonHomeworks.store);

  const addHomeworkModalControl = useModalControl<AddHomeworkModalPropTypes>();

  useEffect(() => {
    $lessonHomeworks.effect(lessonId);
  }, []);

  const onHomeworkClick = (id) => {
    history.push(`${location.pathname}?homeworkId=${id}`);
  }

  return (
    <div className="lesson-details__sections">
      <div className="lesson-details__sections__title flex-justify">
        <div>Домашнее задание</div>
        <ButtonUI
          type="primary"
          withIcon
          size="small"
          onClick={() => addHomeworkModalControl.openModal({ lessonId })}
        >
          <AddPlusSvgIcon /> Добавить
        </ButtonUI>
      </div>
      <div className="lesson-details__sections__list">
        {lessonHomeworksState.data.map((item, index) => (
          <div
            className={`lesson-details__sections__list__item ${String(item.id) === selectedHomeworkId ? "active" : ""}`}
            key={item.id}
            onClick={() => onHomeworkClick(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <ModalUI
        open={addHomeworkModalControl.modalProps.open}
        onCancel={addHomeworkModalControl.closeModal}
      >
        <AddHomeworkModal
          modalControl={addHomeworkModalControl}
          callback={(elem) => {
            $lessonHomeworks.update({
              ...lessonHomeworksState,
              data: [ ...lessonHomeworksState.data, elem ]
            });
          }}
        />
      </ModalUI>
    </div>
  )
}