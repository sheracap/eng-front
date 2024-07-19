import React from "react";

import { ROUTES } from "#constants/index";
import { useStyles } from "#styles/global";
import { Route, Router, Switch } from "react-router-dom";

import { history } from "./history";
import { UserAuth } from "./screens/auth";
import { Main } from "./screens/main";
import { AdminPage } from "#src/app/screens/admin";

export function App() {
  useStyles();

  return (
    <Router history={history}>
      <Switch>
        <Route path={ROUTES.USER} component={UserAuth} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
