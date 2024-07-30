import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";
import { Pagination } from "antd";

import { $lessonsList } from "#stores/lessons";

import { imagesBaseUrl, ROUTES } from "#constants/index";

import { useRole } from "#hooks/useRole";

import { ContentUI } from "#ui/content";

import { $currentUser } from "#stores/account";


export const CommonLessons = () => {

  const history = useHistory();
  const { isStudent } = useRole();

  const lessonsListState = useStore($lessonsList.store);
  const currentUserState = useStore($currentUser.store);

  const [params, setParams] = useState<any>({
    level: isStudent ? currentUserState.data?.level : undefined,
    page: 1
  });

  const getLessons = () => {
    $lessonsList.effect(params);
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
            <h1>Уроки</h1>
          </div>
          <div className="courses">
            {lessonsListState.data.rows.map((item) => (
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
              total={lessonsListState.data.count}
              onChange={onPaginationChange}
              hideOnSinglePage={true}
              showSizeChanger={false}
            />

          </div>
        </div>
      </div>
    </ContentUI>
  )
};