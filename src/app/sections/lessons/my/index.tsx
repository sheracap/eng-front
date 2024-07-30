import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";
import { Pagination } from "antd";

import { $myLessonsList } from "#stores/lessons";

import { imagesBaseUrl, ROUTES } from "#constants/index";

import { useModalControl } from "#hooks/useModalControl";
import { useRole } from "#hooks/useRole";

import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { ContentUI } from "#ui/content";

import { AddPlusSvgIcon } from "#src/assets/svg";

import { AddLessonModal, AddLessonModalPropTypes } from "./addModal";


export const MyLessons = () => {

  const history = useHistory();

  const myLessonsListState = useStore($myLessonsList.store);

  const [params, setParams] = useState<any>({ page: 1 });

  const addLessonModalControl = useModalControl<AddLessonModalPropTypes>();

  const { isTeacher } = useRole();

  const getLessons = () => {
    $myLessonsList.effect(params);
  };

  useEffect(() => {
    getLessons();
  }, []);

  const onOpenLesson = (id: number) => {
    history.push(`${ROUTES.LESSONS}/${id}/1`);
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
            <h1>Мои уроки</h1>
            {isTeacher && (
              <ButtonUI
                type="primary"
                withIcon
                onClick={() => addLessonModalControl.openModal({ isPrivate: true })}
              >
                <AddPlusSvgIcon />
                Добавить урок
              </ButtonUI>
            )}
          </div>
          <div className="courses">
            {myLessonsListState.data.rows.map((item) => (
              <div className="courses__item" key={item.id} onClick={() => onOpenLesson(item.id)}>
                <div className="courses__item__image">
                  {item.img ? (
                    <img src={`${imagesBaseUrl}/lessons/${item.img}`} alt=""/>
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
              total={myLessonsListState.data.count}
              onChange={onPaginationChange}
              hideOnSinglePage={true}
              showSizeChanger={false}
            />

          </div>
          <ModalUI
            open={addLessonModalControl.modalProps.open}
            onCancel={addLessonModalControl.closeModal}
          >
            <AddLessonModal
              modalControl={addLessonModalControl}
              afterAdd={() => {
                getLessons();
              }}
              afterUpdate={() => {
                getLessons();
              }}
            />
          </ModalUI>
        </div>
      </div>
    </ContentUI>
  )
};