import React, { FC } from "react";

import { BurgerMenuSvgIcon } from "#svgIcons/index";
import { ButtonUI } from "#ui/button";
import { Header } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";

import { CurrentUserDropdown } from "../currentUserDropdown";
import { Notifications } from "../notifications";

import "./styles.scss";

interface HeaderUIPropsType {
  siderOpened: boolean;
  setSiderOpened: (siderOpened: boolean) => void;
}

export const HeaderUI: FC<HeaderUIPropsType> = (props) => {




  return (
    <Header className="header content-block">
      <div className="headerLeftSide">
        <div className="logo">
          <Link to="/">
            Logo
          </Link>
        </div>
      </div>
      <div className="headerRightSide">
        <Notifications />
        <CurrentUserDropdown />
      </div>
    </Header>
  );
};
