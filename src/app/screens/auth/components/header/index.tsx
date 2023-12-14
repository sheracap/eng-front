import React, { FC } from "react";

import { ROUTES } from "#constants/index";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";

export const HeaderAuthUI: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.headerAuth}>
      <div className={classes.headerAuthLogo}>
        <Link to={ROUTES.USER_SIGN_IN}>
          Logo
        </Link>
      </div>
      <div></div>
    </div>
  );
};
