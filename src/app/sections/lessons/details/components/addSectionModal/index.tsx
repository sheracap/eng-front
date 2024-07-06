import React, { FC, useEffect } from "react";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { $addSection, $updateSection } from "#stores/section";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";
import { $lessonSections } from "#src/app/sections/lessons/details/effector";
import { notificationSuccess } from "#ui/notifications";


export type AddSectionModalPropTypes = {
  sectionDetails?: { id: number; name: string; };
  lessonId: number;
};

type PropTypes = {
  modalControl: ModalControlType<AddSectionModalPropTypes>;
};

export const AddSectionModal: FC<PropTypes> = (props) => {
  const { modalControl } = props;

  const { closeModal, modalProps } = modalControl;

  const { sectionDetails, lessonId } = modalProps;

  const [form] = Form.useForm();

  const addSectionState = useStore($addSection.store);
  const updateSectionState = useStore($updateSection.store);

  useEffect(() => {
    if (sectionDetails) {
      form.setFieldValue("name", sectionDetails.name);
    }

    return () => {
      $addSection.reset();
      $updateSection.reset();
    };
  }, []);

  useEffect(() => {
    if (addSectionState.data) {
      notificationSuccess("Раздел создан", "");

      const createdElemId = addSectionState.data;
      closeModal();

      const lessonSectionsState = $lessonSections.store.getState();

      $lessonSections.update([
        ...lessonSectionsState,
        {
          id: createdElemId,
          name: form.getFieldValue("name")
        }
      ]);
    }
  }, [addSectionState.data]);

  useEffect(() => {
    if (updateSectionState.data) {
      notificationSuccess("Данные обновлены", "");

      closeModal();

      const lessonSectionsState = $lessonSections.store.getState();

      $lessonSections.update(lessonSectionsState.map((item) => ({
        ...item,
        name: item.id === updateSectionState.data ? form.getFieldValue("name") : item.name
      })));
    }
  }, [updateSectionState.data]);

  const onCancelClick = () => {
    closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      lessonId,
      name: formData.name
    }

    if (sectionDetails) {
      $updateSection.effect({
        id: sectionDetails.id,
        ...data
      });
    } else {
      $addSection.effect(data);
    }
  };

  return (
    <>
      <ModalUI.Loading show={addSectionState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>{sectionDetails ? "Редактировать раздел" : "Добавить раздел"}</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Название" name="name" rules={requiredRules}>
            <InputUI placeholder="Введите название раздела" />
          </FormUI.Item>
        </FormUI>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={onCancelClick}>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={() => form.submit()}>
              {sectionDetails ? "Сохранить" : "Добавить"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
