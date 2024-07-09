import React, { FC } from "react";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { AddCourseModal, AddCourseModalType } from "#src/app/sections/courses/my/addModal";
import { CourseDetailsModel } from "#businessLogic/models/courses";
import { useModalControl } from "#hooks/useModalControl";
import { CourseDetailsChapters } from "./chapters";
import { EditSvgIcon } from "#src/assets/svg";
import { imagesBaseUrl } from "#constants/index";
import { BackBtn } from "#ui/backBtn";
import { useHistory } from "react-router-dom";

type PropsTypes = {
  data: CourseDetailsModel;
  getDetails: () => void;
}

export const CourseDetailsInfo: FC<PropsTypes> = (props) => {
  const { data, getDetails } = props;

  const history = useHistory();

  const updateCourseModalControl = useModalControl<AddCourseModalType>();

  return (
    <div className="main-content">
      <div className="course-details">
        <div className="course-details__head content-block">
          <div>
            <div className="course-details__head__name">
              <BackBtn onBackClick={() => history.goBack()} />
              {data.name}
            </div>
            <div className="course-details__head__desc">
              {data.img && (
                <div className="course-details__head__img">
                  <img src={`${imagesBaseUrl}/courses/${data.img}`} alt="" />
                </div>
              )}
              <div>{data.description}</div>
            </div>
          </div>
          <div className="course-details__head__actions">
            <ButtonUI
              type="primary"
              withIcon
              onClick={() => updateCourseModalControl.openModal({ id: data.id })}
            >
              <EditSvgIcon /> Редактировать
            </ButtonUI>
          </div>
        </div>

        <CourseDetailsChapters courseId={data.id} courseAuthorId={data.userId} isPrivate={data.isPrivate} />

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