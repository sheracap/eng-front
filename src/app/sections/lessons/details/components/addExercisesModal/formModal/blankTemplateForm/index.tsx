import React, { FC, useEffect } from "react";

import { requiredRules, templateTypes } from "#constants/index";
import { FormUI } from "#ui/form";
import { Form } from "antd";
import { ButtonUI } from "#ui/button";

import { ModalUI } from "#ui/modal";
import { InputUI } from "#ui/input";
import { notificationWarning } from "#ui/notifications";
import { ExerciseItemModel } from "#businessLogic/models/section";
import { CheckboxUI } from "#ui/checkbox";
import { ExerciseCreateModel, ExerciseUpdateModel } from "#businessLogic/models/exercise";


type PropTypes = {
  editableData?: ExerciseItemModel;
  entityId: number;
  isHomework: boolean;
  closeModal: () => void;
  create: (data: ExerciseCreateModel | any) => void;
  update: (data: ExerciseUpdateModel["data"]) => void;
};

export const BlankTemplateForm: FC<PropTypes> = (props) => {
  const { editableData, entityId, isHomework, closeModal, create, update } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (editableData) {
      const text = editableData.metaData.resultArray.reduce((acc, currentVal) => {
        return acc + " " + currentVal;
      }, "");

      form.setFieldsValue({
        title: editableData.title,
        text,
        notes: editableData.metaData.notes?.value,
        showNotes: editableData.metaData.notes?.showNotes || false,
      });
    }
  }, []);

  const onFinish = (formData) => {

    const answer: Array<string> = [];

    const inputString = formData.text;

    const regex = /(\[[^\]]+\])/g;
    const resultArray = inputString.split(regex);

    resultArray.forEach((item) => {
      if (item[0] === "[") {
        answer.push(item);
      }
    });

    if (!answer.length) {
      notificationWarning("Необходимо выделить слова к заполнению", "");
      return;
    }

    const data = {
      title: formData.title,
      sectionId: isHomework ? undefined : entityId,
      homeworkId: isHomework ? entityId : undefined,
      isHomework,
      template: templateTypes.BLANK,
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
        <ModalUI.Title>Шаблон "Заполнить поля"</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI
          phantomSubmit
          form={form}
          initialValues={{
            showNotes: false
          }}
          onFinish={onFinish}
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
            <ButtonUI type="primary" onClick={() => form.submit()} fullWidth>
              Добавить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
