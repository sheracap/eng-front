import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $myCoursesList } from "#stores/courses";
import { ROUTES } from "#constants/index";
import { useHistory } from "react-router-dom";
import { ButtonUI } from "#ui/button";
import { useModalControl } from "#hooks/useModalControl";
import { ModalUI } from "#ui/modal";
import { AddCourseModal, AddCourseModalType } from "#src/app/sections/home/myCourses/addModal";
import { AddPlusSvgIcon } from "#src/assets/svg";

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
      <div className="folder-head content-block">
        <h1>Мои курсы</h1>
        <ButtonUI
          type="primary"
          withIcon
          onClick={() => addCourseModalControl.openModal()}
        >
          <AddPlusSvgIcon />
          Добавить курс
        </ButtonUI>
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