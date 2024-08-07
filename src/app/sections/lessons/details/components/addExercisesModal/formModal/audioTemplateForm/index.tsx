import React, { FC, useEffect, useState } from "react";
import { Form, Upload, message } from "antd";

import { requiredRules, templateTypes } from "#constants/index";

import { FormUI } from "#ui/form";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { InputUI } from "#ui/input";

import { ExerciseItemModel } from "#businessLogic/models/section";

import { ExerciseCreateModel, ExerciseUpdateModel } from "#businessLogic/models/exercise";

import "./styles.module.scss";
import styles
  from "#src/app/sections/lessons/details/components/addExercisesModal/formModal/imagesTemplateForm/styles.module.scss";
import { AddPlusSvgIcon } from "#src/assets/svg";
import { RcFile } from "antd/lib/upload";
import { isFileCorrespondType, UPLOAD_FILE_TYPES } from "#utils/index";
import { notificationWarning } from "#ui/notifications";


type PropTypes = {
  editableData?: ExerciseItemModel;
  entityId: number;
  isHomework: boolean;
  closeModal: () => void;
  create: (data: ExerciseCreateModel | any) => void;
  update: (data: ExerciseUpdateModel["data"] | any) => void;
};


export const AudioTemplateForm: FC<PropTypes> = (props) => {
  const { editableData, entityId, isHomework, closeModal, create, update } = props;

  const [form] = Form.useForm();

  const [fileForUpload, setFileForUpload] = useState<RcFile | null>(null);

  useEffect(() => {
    if (editableData) {
      form.setFieldsValue({
        title: editableData.title,
      });
    }
  }, []);

  const beforeUploadPhoto = (file: RcFile) => {
    const correspondType = isFileCorrespondType(file, UPLOAD_FILE_TYPES.AUDIO);

    if (!correspondType) {
      message.error("Можно загрузить только аудио файлы!");
      return false;
    }

    if (correspondType) {
      setFileForUpload(file);
    }

    return false;
  };

  const onRemove = () => {
    setFileForUpload(null);
  }

  const onFinish = (formData) => {
    const data = new FormData();

    if (!editableData && !fileForUpload) {
      notificationWarning("Выберите файл", "");
      return;
    }

    data.append("title", formData.title);
    data.append("sectionId", isHomework ? "" : String(entityId));
    data.append("homeworkId", isHomework ? String(entityId) : "");
    data.append("template", templateTypes.AUDIO);

    if (fileForUpload) {
      data.append("audio", fileForUpload);
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
        <ModalUI.Title>Шаблон аудио</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <div style={{ marginBottom: "23px" }}>
            <FormUI.Item label="Заголовок" name="title" rules={requiredRules}>
              <InputUI placeholder="Введите заголовок" />
            </FormUI.Item>
          </div>
          <Upload
            listType="picture-card"
            className="audio-uploader"
            showUploadList={fileForUpload ? true : false}
            beforeUpload={beforeUploadPhoto}
            onRemove={onRemove}
            fileList={fileForUpload ? [fileForUpload] : undefined}
            accept=".mp3,audio/*"
          >
            <div className={styles.formPhotosUploadItemPlaceholder}>
              <span>
                <AddPlusSvgIcon />
              </span>
              <div>Выберите файл</div>
            </div>
          </Upload>
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
