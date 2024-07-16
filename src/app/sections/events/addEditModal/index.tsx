import React, { FC, useEffect } from "react";
import { Form, TimePicker } from "antd";
import moment from "moment";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { $addEvent, $updateEvent } from "#stores/events";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";
import { notificationSuccess } from "#ui/notifications";


export type AddEditEventModalPropTypes = {
  eventDetails?: { id: number; name: string; time: string; };
  date: string;
};

type PropTypes = {
  modalControl: ModalControlType<AddEditEventModalPropTypes>;
};

export const AddEditEventModal: FC<PropTypes> = (props) => {
  const { modalControl } = props;

  const { closeModal, modalProps } = modalControl;

  const { eventDetails, date } = modalProps;

  const [form] = Form.useForm();

  const addEventState = useStore($addEvent.store);
  const updateEventState = useStore($updateEvent.store);

  useEffect(() => {
    if (eventDetails) {
      form.setFieldsValue({
        name: eventDetails.name,
        time: moment(eventDetails.time, 'HH:mm')
      });
    }

    return () => {
      $addEvent.reset();
      $updateEvent.reset();
    };
  }, []);

  useEffect(() => {
    if (addEventState.data) {
      notificationSuccess("Событие создано", "");

      closeModal();
    }
  }, [addEventState.data]);

  useEffect(() => {
    if (updateEventState.data) {
      notificationSuccess("Данные обновлены", "");

      closeModal();
    }
  }, [updateEventState.data]);

  const onCancelClick = () => {
    closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      name: formData.name,
      time: `${formData.time.format("HH:ss")}:00`,
      date
    }

    if (eventDetails) {
      $updateEvent.effect({
        id: eventDetails.id,
        ...data
      });
    } else {
      $addEvent.effect(data);
    }
  };

  return (
    <>
      <ModalUI.Loading show={addEventState.loading || updateEventState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>{eventDetails ? "Редактировать событие" : "Добавить событие"}</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Название" name="name" rules={requiredRules}>
            <InputUI placeholder="Введите название" />
          </FormUI.Item>
          <FormUI.Item label="Время" name="time" rules={requiredRules}>
            <TimePicker format={"HH:mm"} />
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
              {eventDetails ? "Сохранить" : "Добавить"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
