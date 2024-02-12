import React, { FC, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { $lessonDetails } from "#stores/lessons";
import { useStore } from "effector-react";

import "./styles.scss";
import { ContentUI } from "#ui/content";
import { $courseChapters } from "#stores/courses";
import { CollapseUI } from "#ui/collapse";
import { ChapterLessons } from "#src/app/sections/courses/details/info/chapters/lessons";
import { LessonSection } from "#src/app/sections/lessons/details/section";
import { $currentUser } from "#stores/account";

import { LessonSections } from "#src/app/sections/lessons/details/components/sections";

export interface LessonDetailsMatchParams {
  id: string;
  index: string;
}

type PropsTypes = {
  isCoursePage?: boolean;
}

export const LessonDetails: FC<PropsTypes> = (props) => {
  const { isCoursePage } = props;
  const match = useRouteMatch<LessonDetailsMatchParams>();
  const lessonId = match.params.id;
  const sectionIndex = match.params.index;

  const { data: currentUserData } = useStore($currentUser.store);
  const { data: lessonData } = useStore($lessonDetails.store);
  const { data: chapters } = useStore($courseChapters.store);

  useEffect(() => {
    $lessonDetails.effect(lessonId);

    return () => {
      $lessonDetails.reset();
    }
  }, [lessonId]);

  useEffect(() => {
    if (lessonData) {
      if (!chapters.length && lessonData.chapter) {
        const courseId = String(lessonData.chapter.course.id);

        $courseChapters.effect(courseId);
      }
    }
  }, [lessonData]);

  if (!lessonData) {
    return <ContentUI loading={true} />
  }

  const isMine = currentUserData?.id === lessonData.userId;

  return (
    <div className="lesson-details">
      <div className="lesson-details__left">
        <div className="content-block">
          {lessonData.chapter && (
            <>
              <div className="lesson-details__course-name">
                Курс: <strong>{lessonData.chapter.course.name}</strong>
              </div>
              <div>
                <div className="lesson-details__chapters">
                  <CollapseUI defaultActiveKey={[lessonData.chapter.id]}>
                    {chapters.map((item) => (
                      <CollapseUI.Item
                        key={item.id}
                        header={(
                          <div className="lesson-details__chapters-item">
                            <div>{item.name}</div>
                          </div>
                        )}
                      >
                        {lessonData.chapter && (
                          <ChapterLessons
                            courseId={lessonData.chapter.course.id}
                            chapterId={item.id}
                            lessonsCount={item.lessonsCount}
                            isLessonPage={true}
                            activeLessonId={lessonData.id}
                          />
                        )}
                      </CollapseUI.Item>
                    ))}
                  </CollapseUI>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="content-block">
          <LessonSections
            courseId={lessonData.chapter?.course.id}
            lessonId={lessonData.id}
            sections={lessonData.sections}
            sectionIndex={sectionIndex}
            isMine={isMine}
          />
        </div>
      </div>
      <div className="lesson-details__right">
        <div className="content-block">
          <LessonSection
            isMine={isMine}
            lessonData={lessonData}
            sectionIndex={sectionIndex}
          />
        </div>
      </div>
    </div>
  )
};