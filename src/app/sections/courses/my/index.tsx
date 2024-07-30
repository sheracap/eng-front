import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";
import { Pagination } from "antd";

import { $myCoursesList } from "#stores/courses";

import { imagesBaseUrl, ROUTES } from "#constants/index";

import { useModalControl } from "#hooks/useModalControl";
import { useRole } from "#hooks/useRole";

import { ModalUI } from "#ui/modal";
import { ContentUI } from "#ui/content";
import { ButtonUI } from "#ui/button";

import { AddCourseModal, AddCourseModalType } from "./addModal";
import { AddPlusSvgIcon } from "#src/assets/svg";

import "./styles.scss";

export const MyCourses = () => {

  const history = useHistory();

  const myCoursesListState = useStore($myCoursesList.store);

  const [params, setParams] = useState<any>({ page: 1 });

  const addCourseModalControl = useModalControl<AddCourseModalType>();

  const { isTeacher } = useRole();

  useEffect(() => {
    $myCoursesList.effect(params);
  }, []);

  const onOpenCourse = (id: number) => {
    history.push(`${ROUTES.COURSES}/${id}`);
  };

  const onPaginationChange = (page) => {
    setParams({
      ...params,
      page
    });
  }

  return (
    <ContentUI>
      <div className="main-content">
        <div>
          <div className="folder-head content-block">
            <h1>Мои курсы</h1>
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
          <div className="courses">
            {myCoursesListState.data.rows.map((item) => (
              <div className="courses__item" key={item.id} onClick={() => onOpenCourse(item.id)}>
                <div className="courses__item__image">
                  {item.img ? (
                    <img src={`${imagesBaseUrl}/courses/${item.img}`} alt=""/>
                  ) : (
                    <div className="courses__item__image__empty"></div>
                  )}
                </div>
                <div className="courses__item__name">
                  {item.name}
                </div>
              </div>
            ))}


            <Pagination
              current={params.page}
              total={myCoursesListState.data.count}
              onChange={onPaginationChange}
              hideOnSinglePage={true}
              showSizeChanger={false}
            />

          </div>
          <ModalUI
            open={addCourseModalControl.modalProps.open}
            onCancel={addCourseModalControl.closeModal}
          >
            <AddCourseModal modalControl={addCourseModalControl} />
          </ModalUI>
        </div>
      </div>
    </ContentUI>
  )
};