import React, { FC } from "react";

import { Header } from "antd/lib/layout/layout";

import { CurrentUserDropdown } from "../currentUserDropdown";
import { Notifications } from "../notifications";

import "./styles.scss";
import { ActiveLesson } from "#src/app/screens/main/header/activeLesson";
import { useRole } from "#hooks/useRole";
import { StartLesson } from "#src/app/screens/main/header/startLesson";

interface HeaderUIPropsType {
  siderOpened: boolean;
  setSiderOpened: (siderOpened: boolean) => void;
}

export const HeaderUI: FC<HeaderUIPropsType> = (props) => {
  const { isTeacher } = useRole();



  return (
    <Header className="header content-block">
      <div className="headerLeftSide">
        {isTeacher && (
          <StartLesson />
        )}
      </div>
      <div className="headerRightSide">
        <ActiveLesson />
        <Notifications />
        <CurrentUserDropdown />
      </div>
    </Header>
  );
};
