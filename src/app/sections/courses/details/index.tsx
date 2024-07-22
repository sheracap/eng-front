import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ContentUI } from "#ui/content";
import { useStore } from "effector-react";
import { $courseChapters, $courseDetails } from "#stores/courses";


import { CourseDetailsInfo } from "./info";
import { LessonDetails } from "#src/app/sections/lessons/details";

interface CourseDetailsMatchParams {
  id: string;
}

export const CourseDetails = (props) => {
  const match = useRouteMatch<CourseDetailsMatchParams>();
  const courseId = Number(match.params.id);

  const { data, loading } = useStore($courseDetails.store);

  const getDetails = () => {
    $courseDetails.effect(courseId);
    $courseChapters.effect(courseId);
  };

  useEffect(() => {
    getDetails();

    return () => {
      $courseDetails.reset();
      $courseChapters.reset();
    }
  }, []);

  if (!data) {
    return (
      <ContentUI loading={true} />
    )
  }


  return (
    <Switch>
      <Route
        exact
        path={match.path}
        render={() => (
          <CourseDetailsInfo data={data} getDetails={getDetails} />
        )}
      />
      <Route
        path={`${match.path}/lesson/:id/:index`}
        render={() => (
          <LessonDetails courseId={courseId} />
        )}
      />
    </Switch>
  )
};