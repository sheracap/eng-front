import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "effector-react";
import { $coursesList } from "#stores/courses";
import { imagesBaseUrl, ROUTES } from "#constants/index";

export const Interesting = () => {
  const history = useHistory();

  const coursesListState = useStore($coursesList.store);


  useEffect(() => {
    //$coursesList.effect();

  }, []);

  const onOpenCourse = (id: number) => {
    history.push(`${ROUTES.COURSES}/${id}`);
  };

  const onCreateTomato = () => {

  }

  const onUpdateTomato = () => {

  };

  return (
    <div>




      {/*<div className="courses">*/}
      {/*  {coursesListState.data.rows.map((item) => (*/}
      {/*    <div className="courses__item" key={item.id} onClick={() => onOpenCourse(item.id)}>*/}
      {/*      <div className="courses__item__image">*/}
      {/*        {item.img && (*/}
      {/*          <img src={`${imagesBaseUrl}/courses/${item.img}`} alt=""/>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*      <div className="courses__item__name">*/}
      {/*        {item.name}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  )
};