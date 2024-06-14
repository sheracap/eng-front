import React from "react";

import { ROUTES } from "#constants/index";
import { Route, Switch } from "react-router-dom";
import { HomeworkList } from "./list";
import { HomeworkDetailsPage } from "./details";

export const Homework = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.HOMEWORK} component={HomeworkList} />
      <Route path={`${ROUTES.HOMEWORK}/:id`} component={HomeworkDetailsPage} />
    </Switch>
  );
};