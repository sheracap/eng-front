import React, { FC } from "react";
import { Popover } from "antd";
import { NotificationsIcon } from "#src/assets/svg";

import "./styles.scss";

const NotificationsList = () => {

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


  return (
    <div>
      <Popover
        placement="bottomRight"
        content={<NotificationsList />}
        trigger="click"
      >
        <div>
          <NotificationsIcon />
        </div>
      </Popover>
    </div>
  );
};
