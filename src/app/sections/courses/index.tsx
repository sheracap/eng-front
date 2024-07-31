import React from "react";
import { Route, Switch } from "react-router-dom";

import { ROUTES } from "#constants/index";

import { CoursesList } from "./list";
import { CourseDetails } from "./details";


export const Courses = () => {
  return (
    <Switch>
      <Route exact path={`${ROUTES.COURSES}`} component={CoursesList}/>
      <Route path={`${ROUTES.COURSES}/:id`} component={CourseDetails} />
    </Switch>
  );
};