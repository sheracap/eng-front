import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";
import { Popover, Badge } from "antd";

import { NotificationsIcon } from "#src/assets/svg";

import { $newNotificationsCount, $notifications } from "#stores/notifications";

import "./styles.scss";


const NotificationsList = () => {

  const notifications = useStore($notifications.store);

  useEffect(() => {
    $notifications.effect();
  }, []);

  console.log("notifications", notifications.data);

  return (
    <div className="notifications-list">
      <div className={`notifications-list__item new-notification`}>
        <div className="notifications-list__item__icon">Icon</div>
        <div className="notifications-list__item__text">Text</div>
      </div>
      <div className={`notifications-list__item new-notification`}>
        <div className="notifications-list__item__icon">Icon</div>
        <div className="notifications-list__item__text">Text</div>
      </div>
      <div className={`notifications-list__item`}>
        <div className="notifications-list__item__icon">Icon</div>
        <div className="notifications-list__item__text">Text</div>
      </div>
      <div className={`notifications-list__item`}>
        <div className="notifications-list__item__icon">Icon</div>
        <div className="notifications-list__item__text">Text</div>
      </div>
    </div>
  );
};

export const Notifications: FC = (props) => {

  const { data: newCount } = useStore($newNotificationsCount.store);

  useEffect(() => {
    $newNotificationsCount.effect();
  }, []);

  return (
    <div>
      <Popover
        placement="bottomRight"
        content={<NotificationsList />}
        trigger="click"
      >
        <Badge count={newCount}>
          <div>
            <NotificationsIcon />
          </div>
        </Badge>
      </Popover>
    </div>
  );
};
