import React from "react";

import { ROUTES } from "#constants/index";
import { Route, Switch } from "react-router-dom";

import { BooksList } from "./list";
import { BookDetailsPage } from "./details";

export const Books = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.BOOKS} component={BooksList} />
      <Route path={`${ROUTES.BOOKS}/:id`} component={BookDetailsPage} />
    </Switch>
  );
};