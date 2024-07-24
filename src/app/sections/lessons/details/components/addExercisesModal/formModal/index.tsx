import React, { FC, useEffect } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { TestTemplateForm } from "./testTemplateForm";
import { TextBlockTemplateForm } from "./textBlockForm";
import { BlankTemplateForm } from "./blankTemplateForm";
import { FillTextTemplateForm } from "./fillTextTemplateForm";
import { VideoTemplateForm } from "./videoTemplateForm";
import { ImagesTemplateForm } from "./imagesTemplateForm";
import { AudioTemplateForm } from "./audioTemplateForm";

import { templateTypes } from "#constants/index";
import { ExerciseItemModel } from "#businessLogic/models/section";
import { useStore } from "effector-react";
import { $addExercise, $updateExercise } from "#stores/exercise";
import { $addHomeworkExercise, $updateHomeworkExercise } from "#stores/homework";
import { notificationSuccess } from "#ui/notifications";
import { ExerciseCreateModel, ExerciseUpdateModel } from "#businessLogic/models/exercise";
import { Spinner } from "#ui/spinner";

export type AddEditExercisesFormModalPropTypes = {
  editableData?: ExerciseItemModel;
  entityId: number;
  isHomework: boolean;
  template: string;
};

type TProps = {
  modalControl: ModalControlType<AddEditExercisesFormModalPropTypes>;
  closeModal?: () => void;
  callback: () => void;
};

// todo move it to components

export const AddEditExercisesFormModal: FC<TProps> = (props) => {
  const { modalControl, closeModal: closeMainModal, callback } = props;
  const { modalProps } = modalControl;
  const { editableData, entityId, isHomework, template } = modalProps;

  const addExerciseState = useStore($addExercise.store);
  const updateExerciseState = useStore($updateExercise.store);

  const addHomeworkExerciseState = useStore($addHomeworkExercise.store);
  const updateHomeworkExerciseState = useStore($updateHomeworkExercise.store);

  useEffect(() => {
    return () => {
      $addExercise.reset();
      $updateExercise.reset();

      $addHomeworkExercise.reset();
      $updateHomeworkExercise.reset();
    };
  }, []);

  useEffect(() => {
    if (addExerciseState.data || updateExerciseState.data) {
      notificationSuccess("", addExerciseState.data ? "Упражнение добавлено" : "Упражнение обновлено");

      closeMainModal && closeMainModal();

      modalControl.closeModal();

      callback();
    }
  }, [addExerciseState.data, updateExerciseState.data]);

  useEffect(() => {
    if (addHomeworkExerciseState.data || updateHomeworkExerciseState.data) {
      notificationSuccess("", addHomeworkExerciseState.data ? "Упражнение добавлено" : "Упражнение обновлено");

      closeMainModal && closeMainModal();

      modalControl.closeModal();

      callback();
    }
  }, [addHomeworkExerciseState.data, updateHomeworkExerciseState.data]);

  const create = (data: ExerciseCreateModel) => {
    if (isHomework) {
      $addHomeworkExercise.effect(data);
    } else {
      $addExercise.effect(data);
    }
  }

  const update = (data: ExerciseUpdateModel["data"]) => {
    if (editableData) {
      if (isHomework) {
        $updateHomeworkExercise.effect({
          id: editableData.id,
          data
        });
      } else {
        $updateExercise.effect({
          id: editableData.id,
          data
        });
      }
    }
  }

  return (
    <>
      {(addExerciseState.loading || updateExerciseState.loading || addHomeworkExerciseState.loading || updateHomeworkExerciseState.loading) && (
        <div className="abs-loader">
          <Spinner />
        </div>
      )}
      {template === templateTypes.TEST && (
        <TestTemplateForm
          editableData={editableData}
          entityId={entityId}
          isHomework={isHomework}
          closeModal={modalControl.closeModal}
          create={create}
          update={update}
        />
      )}
      {template === templateTypes.TEXT_BLOCK && (
        <TextBlockTemplateForm
          editableData={editableData}
          entityId={entityId}
          isHomework={isHomework}
          closeModal={modalControl.closeModal}
          create={create}
          update={update}
        />
      )}
      {template === templateTypes.BLANK && (
        <BlankTemplateForm
          editableData={editableData}
          entityId={entityId}
          isHomework={isHomework}
          closeModal={modalControl.closeModal}
          create={create}
          update={update}
        />
      )}
      {template === templateTypes.FILL_TEXT && (
        <FillTextTemplateForm
          editableData={editableData}
          entityId={entityId}
          isHomework={isHomework}
          closeModal={modalControl.closeModal}
          create={create}
          update={update}
        />
      )}
      {template === templateTypes.VIDEO && (
        <VideoTemplateForm
          editableData={editableData}
          entityId={entityId}
          isHomework={isHomework}
          closeModal={modalControl.closeModal}
          create={create}
          update={update}
        />
      )}
      {template === templateTypes.IMAGES && (
        <ImagesTemplateForm
          editableData={editableData}
          entityId={entityId}
          isHomework={isHomework}
          closeModal={modalControl.closeModal}
          create={create}
          update={update}
        />
      )}
      {template === templateTypes.AUDIO && (
        <AudioTemplateForm
          editableData={editableData}
          entityId={entityId}
          isHomework={isHomework}
          closeModal={modalControl.closeModal}
          create={create}
          update={update}
        />
      )}
    </>
  );
};
