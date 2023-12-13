import React, { FC } from "react";

import * as accountEffector from "#stores/account";
import { BurgerMenuSvgIcon } from "#svgIcons/index";
import { LogoSupplyAdminSvg } from "#svgIcons/logo";
import { ButtonUI } from "#ui/button";
import { Header } from "antd/lib/layout/layout";
import { useStore } from "effector-react";
import { Link } from "react-router-dom";

import { CurrentUserDropdown } from "../currentUserDropdown";

import { useStyles } from "./styles";

interface HeaderUIPropsType {
  siderOpened: boolean;
  setSiderOpened: (siderOpened: boolean) => void;
}

export const HeaderUI: FC<HeaderUIPropsType> = (props) => {
  const { siderOpened, setSiderOpened } = props;
  const classes = useStyles();

  const { $currentUser } = accountEffector;

  const currentUserState = useStore($currentUser.store);

  return (
    <Header className={classes.header}>
      <div className={classes.headerLeftSide}>
        <ButtonUI className={classes.burgerButton} withIcon onClick={() => setSiderOpened(!siderOpened)}>
          <BurgerMenuSvgIcon />
        </ButtonUI>
        <div className={classes.logo}>
          <Link to="/">
            Logo
          </Link>
        </div>
      </div>
      <div className={classes.headerRightSide}>
        <CurrentUserDropdown currentUserState={currentUserState} />
      </div>
    </Header>
  );
};
