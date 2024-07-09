import React from "react";

import { ROUTES } from "#constants/index";
import { Route, Switch } from "react-router-dom";
import { MyLessons } from "./my";
import { LessonDetails } from "./details";


export const Lessons = () => {
  return (
    <Switch>
      <Route exact path={`${ROUTES.LESSONS}/my`} component={MyLessons} />
      <Route path={`${ROUTES.LESSONS}/:id/:index`} component={LessonDetails} />
    </Switch>
  );
};