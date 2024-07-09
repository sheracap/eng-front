import React from "react";

import { ROUTES } from "#constants/index";
import { Route, Switch } from "react-router-dom";
import { MyStudents } from "./list";


export const Students = () => {
  return (
    <Switch>
      <Route exact path={`${ROUTES.STUDENTS}`} component={MyStudents} />
    </Switch>
  );
};