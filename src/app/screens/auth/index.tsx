import React, { FC } from "react";

import { ROUTES } from "#constants/index";
import { Route, Switch } from "react-router-dom";

import { HeaderAuthUI } from "./components/header";
import { SignIn } from "./signIn";
import { Registration } from "./registration";
import { ForgotPassword } from "./forgotPassword";

import { useStyles } from "./styles";

export const UserAuth: FC = () => {
  const classes = useStyles();

  return (
    <div className={`${classes.wrapper} u-fancy-scrollbar`}>
      <HeaderAuthUI />
      <div className={classes.content}>
        <Switch>
          <Route path={ROUTES.USER_SIGN_IN} component={SignIn} />
          <Route path={ROUTES.USER_REGISTRATION} component={Registration} />
          <Route path={ROUTES.USER_FORGOT_PASSWORD} component={ForgotPassword} />
        </Switch>
      </div>
      <span className={classes.compInfo}>© 2023-2024 Platform</span>
    </div>
  );
};
