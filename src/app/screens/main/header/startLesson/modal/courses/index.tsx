import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { $myCoursesListForLesson } from "#stores/courses";
import { CoursesListItemModel } from "#businessLogic/models/courses";
import { $myLessonsByCourse } from "#stores/lessons";
import { Spinner } from "#ui/spinner";
import { ArrowBackSvgIcon } from "#src/assets/svg";
import { ButtonUI } from "#ui/button";
import { LessonItemModel } from "#businessLogic/models/lessons";

export const StartLessonCoursesTab: FC = () => {

  const myCoursesListState = useStore($myCoursesListForLesson.store);
  const myLessonsByCourseState = useStore($myLessonsByCourse.store);

  const [selectedCourse, setSelectedCourse] = useState<null | CoursesListItemModel>(null);
  const [selectedLesson, setSelectedLesson] = useState<null | LessonItemModel>(null);

  useEffect(() => {
    $myCoursesListForLesson.effect();

    return () => {
      $myCoursesListForLesson.reset();
      $myLessonsByCourse.reset();
    }
  }, []);

  const onCourseClick = (item: CoursesListItemModel) => {
    if (myLessonsByCourseState.data.length) {
      $myLessonsByCourse.reset();
    }
    $myLessonsByCourse.effect(item.id);
    setSelectedCourse(item);
  }

  const onBackClick = () => {
    setSelectedCourse(null);
    setSelectedLesson(null);
  }

  const onLessonClick = (item: LessonItemModel) => {
    setSelectedLesson(item);
  }

  return (
    <>
      {myLessonsByCourseState.loading && (
        <div className="abs-loader">
          <Spinner />
        </div>
      )}
      {selectedCourse ? (
        <div className="start-lesson__lessons">
          <div className="flex-start start-lesson__lessons__title">
            <ButtonUI type="secondary" onClick={onBackClick} withIcon>
              <ArrowBackSvgIcon />
            </ButtonUI>
            <h2>{selectedCourse.name}</h2>
          </div>

          <div className="start-lesson__lessons__list">
            {myLessonsByCourseState.data.map((item) => (
              <div
                className={`start-lesson__lessons__list__item ${item.id === selectedLesson?.id ? "active" : ""}`}
                key={item.id}
                onClick={() => onLessonClick(item)}
              >
                <div className="start-lesson__lessons__list__item__image">
                  <img src={`http://localhost:5000/${item.img}`} alt="" />
                </div>
                <div className="start-lesson__lessons__list__item__chapter">{item.chapter.name}</div>
                <div className="start-lesson__lessons__list__item__name">{item.name}</div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="start-lesson__courses">
          {myCoursesListState.data.rows.map((item) => (
            <div className="start-lesson__courses__item" key={item.id} onClick={() => onCourseClick(item)}>
              <div className="start-lesson__courses__item__image">
                {item.img && (
                  <img src={`http://localhost:5000/${item.img}`} alt=""/>
                )}
              </div>
              <div className="start-lesson__courses__item__name">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}