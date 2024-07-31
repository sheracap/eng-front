import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";
import { Pagination } from "antd";

import { $myCoursesList } from "#stores/courses";

import { imagesBaseUrl, ROUTES } from "#constants/index";




export const MyCoursesList = () => {

  const history = useHistory();

  const myCoursesListState = useStore($myCoursesList.store);

  const [params, setParams] = useState<any>({ page: 1 });

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
    <>


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

    </>
  )
};