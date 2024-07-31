import React, { useEffect, useState } from "react";
import { imagesBaseUrl, ROUTES } from "#constants/index";
import { Pagination } from "antd";
import { useStore } from "effector-react";
import { $coursesList } from "#stores/courses";
import { $currentUser } from "#stores/account";
import { useHistory } from "react-router-dom";
import { useRole } from "#hooks/useRole";

export const CoursesCommonList = () => {

  const history = useHistory();
  const { isStudent } = useRole();

  const coursesListState = useStore($coursesList.store);
  const currentUserState = useStore($currentUser.store);

  const [params, setParams] = useState<any>({
    level: isStudent ? currentUserState.data?.level : undefined,
    page: 1
  });

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
    <>
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
    </>
  )
}