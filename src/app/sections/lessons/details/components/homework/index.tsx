import React, { FC, useEffect } from "react";
import { AddPlusSvgIcon, DeleteIcon, EditSvgIcon } from "#src/assets/svg";
import { ButtonUI } from "#ui/button";
import { useModalControl } from "#hooks/useModalControl";
import { useStore } from "effector-react";
import { ModalUI } from "#ui/modal";
import { AddEditHomeworkModalPropTypes, AddEditHomeworkModal } from "./addEditHomeworkModal";
import { $lessonHomeworks, $deleteHomework } from "#stores/homework";
import { useHistory, useLocation } from "react-router-dom";
import { ContextPopover } from "#ui/contextPopover";
import { Popconfirm } from "antd";
import { notificationSuccess } from "#ui/notifications";

type PropsTypes = {
  lessonId: number;
  selectedHomeworkId: any;
  isMine: boolean;
}

export const LessonHomework: FC<PropsTypes> = (props) => {
  const { lessonId, selectedHomeworkId, isMine } = props;

  const history = useHistory();
  const location = useLocation();

  const lessonHomeworksState = useStore($lessonHomeworks.store);
  const deleteHomeworkState = useStore($deleteHomework.store);

  const addEditHomeworkModalControl = useModalControl<AddEditHomeworkModalPropTypes>();

  useEffect(() => {
    $lessonHomeworks.effect(lessonId);
  }, []);


  useEffect(() => {
    if (deleteHomeworkState.data) {
      notificationSuccess("Домашнее задание удалено", "");

      $lessonHomeworks.update({
        ...lessonHomeworksState,
        data: lessonHomeworksState.data.filter((item) => String(item.id) !== String(deleteHomeworkState.data))
      });

      $deleteHomework.reset();
    }
  }, [deleteHomeworkState.data]);

  const onHomeworkClick = (id) => {
    history.push(`${location.pathname}?homeworkId=${id}`);
  }

  const onDelete = (id: number) => {
    $deleteHomework.effect(id);
  }

  return (
    <div className="lesson-details__sections">
      <div className="lesson-details__sections__title flex-justify">
        <div>Домашнее задание</div>
        <ButtonUI
          type="primary"
          withIcon
          size="small"
          onClick={() => addEditHomeworkModalControl.openModal({ lessonId })}
        >
          <AddPlusSvgIcon /> Добавить
        </ButtonUI>
      </div>
      <div className="lesson-details__sections__list">
        {lessonHomeworksState.data.map((item, index) => (
          <div
            className={`lesson-details__sections__list__item ${String(item.id) === selectedHomeworkId ? "active" : ""}`}
            key={item.id}
          >
            <div
              className="lesson-details__sections__list__item__name"
              onClick={() => onHomeworkClick(item.id)}
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
                          addEditHomeworkModalControl.openModal({ lessonId, homeworkDetails: { id: item.id, name: item.name } });
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
                          loading={deleteHomeworkState.loading}
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
      <ModalUI
        open={addEditHomeworkModalControl.modalProps.open}
        onCancel={addEditHomeworkModalControl.closeModal}
      >
        <AddEditHomeworkModal
          modalControl={addEditHomeworkModalControl}
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