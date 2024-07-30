import React from "react";
import { Route, Switch } from "react-router-dom";

import { ROUTES } from "#constants/index";

import { CommonLessons } from "./common";
import { MyLessons } from "./my";
import { LessonDetails } from "./details";


export const Lessons = () => {
  return (
    <Switch>
      <Route exact path={`${ROUTES.LESSONS}/common`} component={CommonLessons} />
      <Route exact path={`${ROUTES.LESSONS}/my`} component={MyLessons} />
      <Route path={`${ROUTES.LESSONS}/:id/:index`} component={LessonDetails} />
    </Switch>
  );
};