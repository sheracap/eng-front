import React, { FC, useEffect, useState } from "react";

import { requiredRules, templateTypes } from "#constants/index";
import { $addExercise, $updateExercise } from "#stores/exercise";
import { FormUI } from "#ui/form";
import { Form, message } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";
import { ButtonUI } from "#ui/button";

import styles from "./styles.module.scss";
import { ModalUI } from "#ui/modal";
import { ExerciseItemModel } from "#businessLogic/models/section";


type PropTypes = {
  editableData?: ExerciseItemModel;
  sectionId: number;
  closeModal: () => void;
  closeMainModal?: () => void;
};

export const TestTemplateForm: FC<PropTypes> = (props) => {
  const { editableData, sectionId, closeModal, closeMainModal } = props;

  const [form] = Form.useForm();

  const addExerciseState = useStore($addExercise.store);
  const updateExerciseState = useStore($updateExercise.store);

  const [variants, setVariants] = useState<Array<string>>([]);
  const [variantValue, setVariantValue] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (editableData) {
      setAnswer(editableData.metaData.answer);
      setVariants(editableData.metaData.wrongAnswers);

      form.setFieldsValue({
        title: editableData.title,
        question: editableData.metaData.question,
      });
    }

    return () => {
      $addExercise.reset();
      $updateExercise.reset();
    };
  }, []);

  useEffect(() => {
    if (addExerciseState.data) {
      closeModal();
      closeMainModal && closeMainModal();
    }
  }, [addExerciseState.data]);

  useEffect(() => {
    if (updateExerciseState.data) {
      closeModal();
    }
  }, [updateExerciseState.data]);

  const onAddVariant = () => {
    if (!variantValue) {
      message.warning("Введите значение");
      return;
    } else {
      setVariants([ ...variants, variantValue ]);
    }

    setVariantValue("");
  }

  const onFinish = (formData) => {
    if (!answer) {
      message.warning("Выберите правильный ответ");
      return;
    }

    const data = {
      title: formData.title,
      sectionId,
      template: templateTypes.TEST,
      metaData: {
        question: formData.question,
        answer,
        wrongAnswers: variants
      },
    }

    if (editableData) {
      $updateExercise.effect({ id: editableData.id, ...data });
    } else {
      $addExercise.effect(data);
    }
  };

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Шаблон тест</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Заголовок" name="title" rules={requiredRules}>
            <InputUI placeholder="Введите заголовок" />
          </FormUI.Item>
          <FormUI.Item label="Вопрос" name="question" rules={requiredRules}>
            <InputUI placeholder="Введите вопрос" />
          </FormUI.Item>

          <div className={styles.variants}>
            {variants.map((item, index) => (
              <div
                className={`${styles.variantItem} ${item === answer ? "active" : ""}`}
                key={index}
                onClick={() => setAnswer(item)}
              >
                {item}
              </div>
            ))}
          </div>

          <div className={styles.addVariants}>
            <div className={styles.addVariantsInputWrap}>
              <InputUI value={variantValue} onChange={(e) => setVariantValue(e.target.value)} placeholder="Вариант" />
            </div>
            <ButtonUI type="primary" onClick={onAddVariant}>
              +
            </ButtonUI>
          </div>

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
