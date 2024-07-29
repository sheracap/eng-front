import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { $coursesList } from "#stores/courses";
import { imagesBaseUrl, ROUTES } from "#constants/index";
import { useHistory } from "react-router-dom";
import { ContentUI } from "#ui/content";
import { Pagination } from "antd";
import { $currentUser } from "#stores/account";


export const CommonCourses = () => {

  const history = useHistory();

  const coursesListState = useStore($coursesList.store);
  const currentUserState = useStore($currentUser.store);

  const [params, setParams] = useState<any>({ level: currentUserState.data?.level, page: 1 });

  useEffect(() => {
    $coursesList.effect(params);
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
            <h1>Курсы</h1>
          </div>
          <div className="courses">
            {coursesListState.data.rows.map((item) => (
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
              total={coursesListState.data.count}
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