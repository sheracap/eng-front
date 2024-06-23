import React, { FC, useEffect } from "react";
import { Form } from "antd";

import { requiredRules, templateTypes } from "#constants/index";

import { FormUI } from "#ui/form";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { InputUI } from "#ui/input";
import { CheckboxUI } from "#ui/checkbox";

import { RichTextEditorWrapper } from "#src/components/richTextEditor/wrapper";

import { ExerciseItemModel } from "#businessLogic/models/section";


type PropTypes = {
  editableData?: ExerciseItemModel;
  entityId: number;
  isHomework: boolean;
  closeModal: () => void;
  create: any;
  update: any;
};

export const TextBlockTemplateForm: FC<PropTypes> = (props) => {
  const { editableData, entityId, isHomework, closeModal, create, update } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (editableData) {
      form.setFieldsValue({
        title: editableData.title,
        text: JSON.parse(editableData.metaData.text),
        initText: JSON.parse(editableData.metaData.text),
        notes: editableData.metaData.notes?.value,
        showNotes: editableData.metaData.notes?.showNotes || false,
      });
    }
  }, []);

  const onFinish = (formData) => {

    const data = {
      title: formData.title,
      sectionId: isHomework ? undefined : entityId,
      homeworkId: isHomework ? entityId : undefined,
      isHomework,
      template: templateTypes.TEXT_BLOCK,
      metaData: {
        text: JSON.stringify(formData.text),
        notes: formData.notes ? {
          value: formData.notes,
          showNotes: formData.showNotes
        } : null
      },
    }

    if (editableData) {
      update({
        id: editableData.id,
        ...data,
      });
    } else {
      console.log("data", data);
      create(data);
    }
  };

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Шаблон текст</ModalUI.Title>
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
          <FormUI.Item shouldUpdate={(prevValues, curValues) => prevValues.initDescription !== curValues.initDescription}>
            {() => {
              const initText = form.getFieldValue("initText");

              return (
                <FormUI.Item label="Текст" name="text" rules={requiredRules}>
                  <RichTextEditorWrapper initialValue={initText} />
                </FormUI.Item>
              )
            }}
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
              {editableData ? "Сохранить" : "Добавить"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
