import React, { FC, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { $lessonDetails } from "#stores/lessons";
import { useStore } from "effector-react";

import "./styles.scss";
import { ContentUI } from "#ui/content";
// import { $courseChapters } from "#stores/courses";
// import { CollapseUI } from "#ui/collapse";
// import { ChapterLessons } from "#src/app/sections/courses/details/info/chapters/lessons";
import { LessonSection } from "#src/app/sections/lessons/details/section";
import { $currentUser } from "#stores/account";

import { LessonSections } from "#src/app/sections/lessons/details/components/sections";
import { $exerciseAnswers, $lessonSections } from "#src/app/sections/lessons/details/effector";
import { LessonHomework } from "#src/app/sections/lessons/details/components/homework";
import { useLocation } from "react-router";
import { parseParams } from "#hooks/useQueryParams";
import { HomeworkDetails } from "#src/app/sections/lessons/details/homework";
import { $activeLesson } from "#stores/activeLesson";
import { $studentExerciseAnswersBySection } from "#stores/exercise";
import { useRole } from "#hooks/useRole";
import { Tooltip } from "antd";
import { LessonDetailsLeftColumnScroll } from "#src/app/sections/lessons/details/leftColumn";

export interface LessonDetailsMatchParams {
  id: string;
  index: string;
}

type PropsTypes = {
  courseId?: number;
}

const getName = (firstLetter: string, secondLetter: string | undefined) => {
  if (!secondLetter) {
    return firstLetter;
  } else {
    return firstLetter + secondLetter;
  }
}

export const LessonDetails: FC<PropsTypes> = (props) => {
  const { courseId } = props;
  const match = useRouteMatch<LessonDetailsMatchParams>();
  const lessonId = match.params.id;
  const sectionIndex = match.params.index;

  const location = useLocation();

  const queryParams = parseParams(location.search, false);

  const { data: currentUserData } = useStore($currentUser.store);
  const activeLessonState = useStore($activeLesson.store);
  const { data: lessonData } = useStore($lessonDetails.store);
  //const { data: chapters } = useStore($courseChapters.store);
  const lessonSectionsState: any = useStore($lessonSections.store);

  const [selectedStudentId, setSelectedStudentId] = useState<null | number>(null);

  const { isTeacher } = useRole();

  useEffect(() => {
    $lessonDetails.effect(lessonId);

    return () => {
      $lessonDetails.reset();
    }
  }, [lessonId]);

  // useEffect(() => {
  //   if (lessonData) {
  //     if (!chapters.length && lessonData.chapter && courseId) {
  //       $courseChapters.effect(courseId);
  //     }
  //   }
  // }, [lessonData]);

  if (!lessonData) {
    return <ContentUI loading={true} />
  }

  const isMine = currentUserData?.id === lessonData.userId;

  const getStudentAnswers = (studentId: number, sectionId: number) => {
    $studentExerciseAnswersBySection.effect({
      studentId,
      sectionId
    }).then((res) => {
      const answers = res.data.reduce((acc, item) => {
        return {
          ...acc,
          [item.exerciseId]: item.metaData
        }
      }, {});

      $exerciseAnswers.update({
        [sectionId]: answers,
      });

    });
  }

  const onStudentClick = (id) => {
    if (id === selectedStudentId) {
      setSelectedStudentId(null);
      $studentExerciseAnswersBySection.reset();
      $exerciseAnswers.reset();
    } else {
      setSelectedStudentId(id);
      const sectionId = lessonSectionsState[Number(sectionIndex) - 1]?.id;

      getStudentAnswers(id, sectionId);
    }
  }

  return (
    <div className="lesson-details">
      <div className="lesson-details__left">
        <div className="lesson-details__left__in">
          <LessonDetailsLeftColumnScroll>
            {/*<div className="content-block">*/}
            {/*  {lessonData.chapter && (*/}
            {/*    <>*/}
            {/*      <div className="lesson-details__course-name">*/}
            {/*        Курс: <strong>{lessonData.chapter.course.name}</strong>*/}
            {/*      </div>*/}
            {/*      <div>*/}
            {/*        <div className="lesson-details__chapters">*/}
            {/*          <CollapseUI defaultActiveKey={[lessonData.chapter.id]}>*/}
            {/*            {chapters.map((item) => (*/}
            {/*              <CollapseUI.Item*/}
            {/*                key={item.id}*/}
            {/*                header={(*/}
            {/*                  <div className="lesson-details__chapters-item">*/}
            {/*                    <div>{item.name}</div>*/}
            {/*                  </div>*/}
            {/*                )}*/}
            {/*              >*/}
            {/*                {lessonData.chapter && (*/}
            {/*                  <ChapterLessons*/}
            {/*                    courseId={lessonData.chapter.course.id}*/}
            {/*                    chapterId={item.id}*/}
            {/*                    lessonsCount={item.lessonsCount}*/}
            {/*                    isLessonPage={true}*/}
            {/*                    activeLessonId={lessonData.id}*/}
            {/*                  />*/}
            {/*                )}*/}
            {/*              </CollapseUI.Item>*/}
            {/*            ))}*/}
            {/*          </CollapseUI>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </>*/}
            {/*  )}*/}
            {/*</div>*/}

            {activeLessonState.data && isTeacher && (
              <div className="lesson-details__students">
                <div className="lesson-details__students__title">Ученики:</div>
                <div className="lesson-details__students__list">
                  {JSON.parse(activeLessonState.data.students).map((item) => (
                    <div
                      className={`lesson-details__students__list__item ${selectedStudentId === item.id ? "active" : ""}`}
                      key={item.id}
                      onClick={() => onStudentClick(item.id)}
                    >
                      <Tooltip color={"#000000"} title={item.name}>
                        <div>
                          {item.img ? (
                            <img src={item.img} alt={item.name} />
                          ) : (
                            <span>{getName(item.name[0], item.name[1])}</span>
                          )}
                        </div>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="content-block">
              <LessonSections
                courseId={courseId}
                lessonId={lessonData.id}
                sections={lessonData.sections}
                sectionIndex={sectionIndex}
                isMine={isMine}
                selectedHomeworkId={queryParams.homeworkId}
              />
            </div>
            {isMine && (
              <div className="content-block">
                <LessonHomework
                  lessonId={lessonData.id}
                  selectedHomeworkId={queryParams.homeworkId}
                />
              </div>
            )}
          </LessonDetailsLeftColumnScroll>
        </div>
      </div>
      <div className="lesson-details__right">
        <div className="content-block">
          {isMine && queryParams.homeworkId ? (
            <HomeworkDetails homeworkId={Number(queryParams.homeworkId)} isMine={isMine} />
          ) : (
            <LessonSection
              isMine={isMine}
              lessonData={lessonData}
              sectionId={lessonSectionsState[Number(sectionIndex) - 1]?.id}
              selectedStudentId={selectedStudentId}
              getStudentAnswers={getStudentAnswers}
            />
          )}
        </div>
      </div>
    </div>
  )
};