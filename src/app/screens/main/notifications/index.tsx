import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Popover, Badge } from "antd";

import { NotificationsIcon } from "#src/assets/svg";

import { $newNotificationsCount, $notificationMarkAsRead, $notifications } from "#stores/notifications";

import { formatDate } from "#utils/formatters";


import { useModalControl } from "#hooks/useModalControl";
import { ModalUI } from "#ui/modal";
import { NotificationModal, NotificationModalPropTypes } from "./notificationModal";
import { useRole } from "#hooks/useRole";
import { ButtonUI } from "#ui/button";
import { NotificationItemModel } from "#businessLogic/models/notifications";

import "./styles.scss";

const NotificationsList = () => {

  const notifications = useStore($notifications.store);
  const [currentNotifications, setCurrentNotifications] = useState<Array<NotificationItemModel>>([]);

  const notificationModalControl = useModalControl<NotificationModalPropTypes>();
  const { isTeacher, isStudent } = useRole();

  useEffect(() => {
    $notifications.effect();

    return () => {
      $notifications.reset();
    }
  }, []);

  useEffect(() => {
    if (notifications.data) {
      setCurrentNotifications((prevState) => [...prevState, ...notifications.data.rows]);
      $notifications.reset();
    }
  }, [notifications.data]);

  return (
    <>
      <div className="notifications-list">
        {currentNotifications.map((item) => (
          <div
            className={`notifications-list__item ${!item.statuses.length ? "new-notification" : ""}`}
            key={item.id}
            onClick={() => notificationModalControl.openModal({ item })}
          >
            <div className="notifications-list__item__text">
              {item.type === "INVITATION" ? (
                <>
                  {isTeacher && `${item.author.name} ${item.invitationAnswer ? "принял Ваше приглашение" : "отклонил Ваше приглашение"}`}
                  {isStudent && `${item.author.name} приглашает Вас стать его учеником`}
                </>
              ) : item.message}
            </div>
            <div className="notifications-list__item__date">{formatDate(item.createdAt)}</div>
          </div>
        ))}
      </div>
      <ModalUI
        open={notificationModalControl.modalProps.open}
        onCancel={notificationModalControl.closeModal}
      >
        <NotificationModal modalControl={notificationModalControl} setCurrentNotifications={setCurrentNotifications} />
      </ModalUI>
    </>
  );
};

export const Notifications: FC = (props) => {

  const newNotificationsCountState = useStore($newNotificationsCount.store);
  const notificationMarkAsReadState = useStore($notificationMarkAsRead.store);

  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    $newNotificationsCount.effect();
  }, []);

  useEffect(() => {
    if (newNotificationsCountState.data) {
      setNewCount(newNotificationsCountState.data);
    }
  }, [newNotificationsCountState.data]);

  useEffect(() => {
    if (notificationMarkAsReadState.success) {
      setNewCount((prevState) => prevState - 1);
    }
  }, [notificationMarkAsReadState.success]);

  return (
    <div className="header-notifications">
      <Popover
        placement="bottomRight"
        content={<NotificationsList />}
        trigger="click"
      >
        <div>
          <Badge count={newCount}>
            <ButtonUI withIcon>
              <NotificationsIcon />
            </ButtonUI>
          </Badge>
        </div>
      </Popover>
    </div>
  );
};
