import React, { FC } from "react";

import * as accountEffector from "#stores/account";
import { BurgerMenuSvgIcon } from "#svgIcons/index";
import { ButtonUI } from "#ui/button";
import { Header } from "antd/lib/layout/layout";
import { useStore } from "effector-react";
import { Link } from "react-router-dom";

import { CurrentUserDropdown } from "../currentUserDropdown";
import { Notifications } from "../notifications";

import "./styles.scss";

interface HeaderUIPropsType {
  siderOpened: boolean;
  setSiderOpened: (siderOpened: boolean) => void;
}

export const HeaderUI: FC<HeaderUIPropsType> = (props) => {
  const { siderOpened, setSiderOpened } = props;

  const { $currentUser } = accountEffector;

  const currentUserState = useStore($currentUser.store);

  return (
    <Header className="header">
      <div className="headerLeftSide">
        <ButtonUI className="burgerButton" withIcon onClick={() => setSiderOpened(!siderOpened)}>
          <BurgerMenuSvgIcon />
        </ButtonUI>
        <div className="logo">
          <Link to="/">
            Logo
          </Link>
        </div>
      </div>
      <div className="headerRightSide">
        <Notifications />
        <CurrentUserDropdown currentUserState={currentUserState} />
      </div>
    </Header>
  );
};
