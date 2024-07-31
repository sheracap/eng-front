import React from "react";

import { ROUTES } from "#constants/index";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { ContentUI } from "#ui/content";

import { useRole } from "#hooks/useRole";

import { CoursesCommonList } from "./common";
import { MyCoursesList } from "./my";

import "./styles.scss";
import { parseParams } from "#hooks/useQueryParams";
import { useLocation } from "react-router";
import { ButtonUI } from "#ui/button";
import { AddPlusSvgIcon } from "#src/assets/svg";
import { ModalUI } from "#ui/modal";
import { AddCourseModal, AddCourseModalType } from "#src/app/sections/courses/list/addModal";
import { useModalControl } from "#hooks/useModalControl";


export const CoursesList = () => {

  const history = useHistory();
  const location = useLocation();

  const queryParams = parseParams(location.search, false);

  const { isTeacher } = useRole();

  const addCourseModalControl = useModalControl<AddCourseModalType>();

  return (
    <ContentUI>
      <div className="main-content">
        <div>
          <div className="folder-head content-block">
            {isTeacher ? (
              <div className="courses__head">
                <div className={`courses__head__item ${queryParams.my ? "" : "active"}`}>
                  <Link to={`${ROUTES.COURSES}`}>Курсы</Link>
                </div>
                <div className={`courses__head__item ${queryParams.my ? "active" : ""}`}>
                  <Link to={`${ROUTES.COURSES}?my=1`}>Мои курсы</Link>
                </div>
              </div>
            ) : (
              <h1>Курсы</h1>
            )}

            {isTeacher && (
              <ButtonUI
                type="primary"
                withIcon
                onClick={() => addCourseModalControl.openModal({ isPrivate: true })}
              >
                <AddPlusSvgIcon />
                Добавить курс
              </ButtonUI>
            )}
          </div>

          {isTeacher && queryParams.my ? (
            <MyCoursesList />
          ) : (
            <CoursesCommonList />
          )}

        </div>
      </div>

      <ModalUI
        open={addCourseModalControl.modalProps.open}
        onCancel={addCourseModalControl.closeModal}
      >
        <AddCourseModal modalControl={addCourseModalControl} />
      </ModalUI>
    </ContentUI>
  )
};