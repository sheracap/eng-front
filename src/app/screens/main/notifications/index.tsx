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
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY_FOR_COOKIE } from "#constants/index";
import { $activeLesson } from "#stores/activeLesson";

const NotificationsList = () => {

  const notifications = useStore($notifications.store);
  const [currentNotifications, setCurrentNotifications] = useState<Array<NotificationItemModel> | null>(null);

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
      setCurrentNotifications((prevState) => [...(prevState ? prevState : []), ...notifications.data.rows]);
      $notifications.reset();
    }
  }, [notifications.data]);

  return (
    <>
      {currentNotifications && (
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
          {currentNotifications.length === 0 && (
            <div>Уведомлений пока нет</div>
          )}
        </>
      )}
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

    subscribe();
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

  const subscribe = async () => {
    const token = Cookies.get(ACCESS_TOKEN_KEY_FOR_COOKIE);
    const eventSource = new EventSource(`http://localhost:5000/api/cabinet/connect?token=${token}`);

    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);

      if (message && message.type) {
        if (message.type === "LESSON") {
          $activeLesson.update({
            loading: false,
            data: {
              lessonId: message.lessonId,
              courseId: message.courseId
            },
            error: null
          });
        } else {
          setNewCount((prevCount) => prevCount + 1);
        }
      }
    }

  }


  return (
    <div className="header-notifications">
      <Popover
        placement="bottomRight"
        content={<NotificationsList />}
        trigger="click"
        overlayClassName="notifications-popover"
      >
        <div>
          <Badge count={newCount}>
            <ButtonUI type="secondary" withIcon>
              <NotificationsIcon />
            </ButtonUI>
          </Badge>
        </div>
      </Popover>
    </div>
  );
};
