import React from "react";

import { ROUTES } from "#constants/index";
import { Route, Switch } from "react-router-dom";
import { CourseDetails } from "./details";
import { CommonCourses } from "./common";
import { MyCourses } from "./my";


export const Courses = () => {
  return (
    <Switch>
      <Route exact path={`${ROUTES.COURSES}/common`} component={CommonCourses} />
      <Route exact path={`${ROUTES.COURSES}/my`} component={MyCourses} />
      <Route path={`${ROUTES.COURSES}/:id`} component={CourseDetails} />
    </Switch>
  );
};