import React, { FC } from "react";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { AddCourseModal, AddCourseModalType } from "#src/app/sections/home/myCourses/addModal";
import { CourseDetailsModel } from "#businessLogic/models/courses";
import { useModalControl } from "#hooks/useModalControl";
import { CourseDetailsChapters } from "./chapters";
import { EditSvgIcon } from "#src/assets/svg";

type PropsTypes = {
  data: CourseDetailsModel;
  getDetails: () => void;
}

export const CourseDetailsInfo: FC<PropsTypes> = (props) => {
  const { data, getDetails } = props;

  const updateCourseModalControl = useModalControl<AddCourseModalType>();

  return (
    <div className="main-content">
      <div className="course-details">
        <div className="course-details__head content-block">
          <div className="course-details__head__img">
            <img src={`http://localhost:5000/${data.img}`} alt="" />
          </div>
          <div>
            <div className="course-details__head__name">
              {data.name}
            </div>
            <div className="course-details__head__desc">
              {data.description}
            </div>
          </div>
          <div className="course-details__head__actions">
            <ButtonUI type="primary" onClick={() => updateCourseModalControl.openModal({ id: data.id })}>
              <EditSvgIcon /> Редактировать
            </ButtonUI>
          </div>
        </div>

        <CourseDetailsChapters courseId={data.id} courseAuthorId={data.userId} />

      </div>

      <ModalUI
        open={updateCourseModalControl.modalProps.open}
        onCancel={updateCourseModalControl.closeModal}
      >
        <AddCourseModal modalControl={updateCourseModalControl} callback={getDetails} />
      </ModalUI>
    </div>
  )
};