import React from "react";

import { ROUTES } from "#constants/index";
import { Route, Switch } from "react-router-dom";
import { CourseDetails } from "./details";

export const Courses = () => {
  return (
    <Switch>
      {/*<Route exact path={ROUTES.COURSES} component={AllClients} />*/}
      <Route path={`${ROUTES.COURSES}/:id`} component={CourseDetails} />
    </Switch>
  );
};