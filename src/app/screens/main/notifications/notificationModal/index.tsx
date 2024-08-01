import React, { FC, useEffect } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { NotificationItemModel } from "#businessLogic/models/notifications";
import { formatDate } from "#utils/formatters";
import { $invitationAnswer, $notificationMarkAsRead } from "#stores/notifications";
import { useStore } from "effector-react";
import { notificationSuccess } from "#ui/notifications";
import { useRole } from "#hooks/useRole";


export type NotificationModalPropTypes = {
  item: NotificationItemModel;
};

type PropTypes = {
  modalControl: ModalControlType<NotificationModalPropTypes>;
  setCurrentNotifications: React.Dispatch<React.SetStateAction<Array<NotificationItemModel> | null>>;
};

export const NotificationModal: FC<PropTypes> = (props) => {
  const { modalControl, setCurrentNotifications } = props;
  const { closeModal, modalProps } = modalControl;
  const { id: notificationId, type, message, statuses, invitationAnswer, author, createdAt } = modalProps.item;
  const isNew = !statuses.length;

  const invitationAnswerState = useStore($invitationAnswer.store);

  const { isTeacher, isStudent } = useRole();

  useEffect(() => {
    if (isNew) {
      $notificationMarkAsRead.effect(notificationId);
      setCurrentNotifications((prevState) => {
        return (prevState ? prevState : []).map((item) => {
          const newItem = { ...item };

          if (item.id === notificationId) {
            newItem.statuses = [0];
          }

          return newItem;
        });
      });
    }

    return () => {
      if (isNew) {
        $notificationMarkAsRead.reset();
      }
      $invitationAnswer.reset();
    }
  }, []);

  useEffect(() => {
    if (invitationAnswerState.success) {
      // в currentuser записать teacherId
      notificationSuccess("Успешно", "Отправлено");
      closeModal();
    }
  }, [invitationAnswerState.success]);

  return (
    <>
      <ModalUI.Loading show={invitationAnswerState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Уведомление</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <div>
          {type === "INVITATION" ? (
            <>
              {isTeacher && `${author.name} ${invitationAnswer ? "принял Ваше приглашение" : "отклонил Ваше приглашение"}`}
              {isStudent && `${author.name} приглашает Вас стать его учеником`}
            </>
          ) : message}
        </div>
        <div>{formatDate(createdAt)}</div>
        {/*{invitationAnswer !== null && (*/}
        {/*  <div>{invitationAnswer ? "Приглашение принято" : "Приглашение отклонено"}</div>*/}
        {/*)}*/}
      </ModalUI.Middle>
      {(type === "INVITATION" && invitationAnswer === null) && (
        <ModalUI.Footer>
          <ModalUI.Buttons>
            <ModalUI.Buttons.Col>
              <ButtonUI type="secondary" onClick={() => $invitationAnswer.effect({ notificationId, answer: false })}>
                Отклонить
              </ButtonUI>
            </ModalUI.Buttons.Col>
            <ModalUI.Buttons.Col>
              <ButtonUI type="primary" onClick={() => $invitationAnswer.effect({ notificationId, answer: true })}>
                Принять
              </ButtonUI>
            </ModalUI.Buttons.Col>
          </ModalUI.Buttons>
        </ModalUI.Footer>
      )}
    </>
  );
};
