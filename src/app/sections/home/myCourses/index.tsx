import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $myCoursesList } from "#stores/courses";
import { ROUTES } from "#constants/index";
import { useHistory } from "react-router-dom";
import { ButtonUI } from "#ui/button";
import { useModalControl } from "#hooks/useModalControl";
import { ModalUI } from "#ui/modal";
import { AddCourseModal, AddCourseModalType } from "#src/app/sections/home/myCourses/addModal";

export const MyCourses = () => {

  const history = useHistory();

  const myCoursesListState = useStore($myCoursesList.store);

  const addCourseModalControl = useModalControl<AddCourseModalType>();

  useEffect(() => {
    $myCoursesList.effect();
  }, []);

  const onOpenCourse = (id: number) => {
    history.push(`${ROUTES.COURSES}/${id}`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px"
        }}
      >
        <h2>Мои курсы</h2>
        <ButtonUI type="primary" onClick={() => addCourseModalControl.openModal()}>Добавить курс</ButtonUI>
      </div>
      <div className="courses">
        {myCoursesListState.data.rows.map((item) => (
          <div className="courses__item" key={item.id} onClick={() => onOpenCourse(item.id)}>
            <div className="courses__item__image">
              {item.img && (
                <img src={`http://localhost:5000/${item.img}`} alt=""/>
              )}
            </div>
            <div className="courses__item__name">
              {item.name}
            </div>
          </div>
        ))}
      </div>
      <ModalUI
        open={addCourseModalControl.modalProps.open}
        onCancel={addCourseModalControl.closeModal}
      >
        <AddCourseModal modalControl={addCourseModalControl} />
      </ModalUI>
    </div>
  )
};