import React, { useEffect, FC } from "react";
import { useStore } from "effector-react";

import styles from "./styles.module.scss";
import { $sectionDetails } from "#stores/section";
import { TemplateTest } from "#components/templates/test";
import { $currentUser } from "#src/app/stores/account";
import { CourseDetailsModel } from "#businessLogic/models/courses";
import { useModalControl } from "#hooks/useModalControl";

import { DrawerModalUI } from "#ui/drawerModal";
import {
  AddExercisesModal,
  AddExercisesModalPropTypes
} from "#src/app/sections/lessons/details/components/addExercisesModal";
import { AddPlusSvgIcon } from "#src/assets/svg";


type PropsTypes = {
  data: CourseDetailsModel;
};

export const CourseDetailsRightSide: FC<PropsTypes> = (props) => {
  const { data } = props;

  const { data: currentUserData } = useStore($currentUser.store);
  const { data: sectionData, loading: sectionLoading } = useStore($sectionDetails.store);

  const isMine = currentUserData?.id === data.userId;

  //const addSectionModalControl = useModalControl<AddSectionModalPropTypes>();
  const addExercisesModalControl = useModalControl<AddExercisesModalPropTypes>();



  return (
    <div className={styles.courseDetailsRightSide}>
      {sectionData && (
        <div>
          <h2>{sectionData.name}</h2>
          {/*{sectionData.exercises.map((item) => (*/}
          {/*  <div className="exercise-item" key={item.id}>*/}
          {/*    {item.template === "TEST" && (*/}
          {/*      <TemplateTest data={item} showHints={false} />*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*))}*/}
        </div>
      )}
      {/*{isMine && !sectionData && (*/}
      {/*  <div className={styles.addSectionWrap} onClick={() => addSectionModalControl.openModal({ courseId: data.id })}>*/}
      {/*    <div className={styles.addSectionIcon}>+</div>*/}
      {/*    <div className={styles.addSectionText}>Добавить раздел</div>*/}
      {/*  </div>*/}
      {/*)}*/}
      {isMine && sectionData && (
        <div className={styles.addSectionWrap} onClick={() => addExercisesModalControl.openModal({ sectionId: sectionData.id })}>
          <div className={styles.addSectionIcon}><AddPlusSvgIcon /></div>
          <div className={styles.addSectionText}>Добавить упражнение</div>
        </div>
      )}
      {/*<ModalUI*/}
      {/*  open={addSectionModalControl.modalProps.open}*/}
      {/*  onCancel={addSectionModalControl.closeModal}*/}
      {/*>*/}
      {/*  <AddSectionModal modalControl={addSectionModalControl} callback={getSectionDetails} />*/}
      {/*</ModalUI>*/}

      {/*<DrawerModalUI*/}
      {/*  open={addExercisesModalControl.modalProps.open}*/}
      {/*  onClose={addExercisesModalControl.closeModal}*/}
      {/*>*/}
      {/*  <AddExercisesModal modalControl={addExercisesModalControl} />*/}
      {/*</DrawerModalUI>*/}

    </div>
  )
};