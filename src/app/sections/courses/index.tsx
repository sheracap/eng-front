import React from "react";
import { Route, Switch } from "react-router-dom";

import { ROUTES } from "#constants/index";

import { CommonCourses } from "./common";
import { MyCourses } from "./my";
import { CourseDetails } from "./details";


export const Courses = () => {
  return (
    <Switch>
      <Route exact path={`${ROUTES.COURSES}/common`} component={CommonCourses} />
      <Route exact path={`${ROUTES.COURSES}/my`} component={MyCourses} />
      <Route path={`${ROUTES.COURSES}/:id`} component={CourseDetails} />
    </Switch>
  );
};