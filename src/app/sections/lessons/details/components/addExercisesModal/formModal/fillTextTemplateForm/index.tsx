import React, { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Form } from "antd";

import { requiredRules, templateTypes } from "#constants/index";
import { $addExercise, $updateExercise } from "#stores/exercise";

import { FormUI } from "#ui/form";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { InputUI } from "#ui/input";
import { notificationWarning } from "#ui/notifications";

import { ExerciseItemModel } from "#businessLogic/models/section";
import { CheckboxUI } from "#ui/checkbox";
import { ExerciseCreateModel, ExerciseUpdateModel } from "#businessLogic/models/exercise";
import {
  BlankTemplateFormStep2
} from "#src/app/sections/lessons/details/components/addExercisesModal/formModal/blankTemplateForm/step2";


type PropTypes = {
  editableData?: ExerciseItemModel;
  entityId: number;
  isHomework: boolean;
  closeModal: () => void;
  create: (data: ExerciseCreateModel | any) => void;
  update: (data: ExerciseUpdateModel["data"]) => void;
};

export const FillTextTemplateForm: FC<PropTypes> = (props) => {
  const { editableData, entityId, isHomework, closeModal, create, update } = props;

  const [step, setStep] = useState(1);

  const [form] = Form.useForm();

  useEffect(() => {
    if (editableData) {
      let text = "";

      let wordIndexByLine = 0;

      editableData.metaData.resultArray.forEach((item) => {

        if (item === "&separator") {
          wordIndexByLine = 0;

          text = text + "\n";
        } else {
          text = text + (wordIndexByLine === 0 ? item : " " + item);

          wordIndexByLine = wordIndexByLine + 1;
        }
      });

      form.setFieldsValue({
        title: editableData.title,
        text,
        notes: editableData.metaData.notes?.value,
        showNotes: editableData.metaData.notes?.showNotes || false,
      });
    }
  }, []);

  const onFinish = (answer, resultArray) => {
    const formData = form.getFieldsValue(true);

    if (step === 1) {
      setStep(2);
      return;
    }

    if (!answer.length) {
      notificationWarning("Необходимо выделить слова к заполнению", "");
      return;
    }

    const data = {
      title: formData.title,
      sectionId: isHomework ? undefined : entityId,
      homeworkId: isHomework ? entityId : undefined,
      isHomework,
      template: templateTypes.FILL_TEXT,
      metaData: {
        resultArray,
        answer,
        notes: formData.notes ? {
          value: formData.notes,
          showNotes: formData.showNotes
        } : null
      },
    }

    if (editableData) {
      update(data);
    } else {
      create(data);
    }
  };

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>{step === 1 ? 'Шаблон "Заполнить поля"' : "Выберите слова"}</ModalUI.Title>
      </ModalUI.Header>

      {step === 1 && (
        <>
          <ModalUI.Middle>
            <FormUI
              phantomSubmit
              form={form}
              onFinish={onFinish}
              initialValues={{
                showNotes: false
              }}
            >
              <FormUI.Item label="Заголовок" name="title" rules={requiredRules}>
                <InputUI placeholder="Введите заголовок" />
              </FormUI.Item>
              <FormUI.Item label="Текст" name="text" rules={requiredRules}>
                <InputUI.TextArea placeholder="Введите текст" rows={10} />
              </FormUI.Item>
              <FormUI.Item label="Заметки / Подсказки" name="notes">
                <InputUI.TextArea placeholder="Введите текст" rows={3} />
              </FormUI.Item>

              <FormUI.Item dependencies={["notes"]}>
                {() => {
                  const notes = form.getFieldValue("notes");

                  if (!notes) {
                    return null;
                  }

                  return (
                    <FormUI.Item name="showNotes" valuePropName="checked">
                      <CheckboxUI>Отображать у ученика</CheckboxUI>
                    </FormUI.Item>
                  )
                }}
              </FormUI.Item>
            </FormUI>
          </ModalUI.Middle>
          <ModalUI.Footer>
            <ModalUI.Buttons>
              <ModalUI.Buttons.Col>
                <ButtonUI onClick={() => closeModal()} fullWidth>
                  Отмена
                </ButtonUI>
              </ModalUI.Buttons.Col>
              <ModalUI.Buttons.Col>
                <ButtonUI
                  type="primary"
                  onClick={() => {
                    form.submit();
                  }}
                  fullWidth
                  withIcon
                >
                  Продолжить
                </ButtonUI>
              </ModalUI.Buttons.Col>
            </ModalUI.Buttons>
          </ModalUI.Footer>
        </>
      )}

      {step === 2 && (
        <BlankTemplateFormStep2 text={form.getFieldValue("text")} setStep={setStep} onFinish={onFinish} isEditMode={!!editableData} />
      )}
    </>
  );
};
