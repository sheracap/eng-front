import React, { FC, useEffect, useState } from "react";

import { imagesBaseUrl, requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { $addLesson, $updateLesson } from "#stores/lessons";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form, message, Upload } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";
import { getBase64, isFileCorrespondSize, isFileCorrespondType, UPLOAD_FILE_TYPES } from "#utils/index";
import { AddPlusSvgIcon } from "#src/assets/svg";
import { LessonItemModel } from "#businessLogic/models/lessons";
import { notificationSuccess } from "#ui/notifications";


export type AddLessonModalPropTypes = {
  lessonDetails?: LessonItemModel;
  chapterId?: number;
  isPrivate?: boolean;
};

type PropTypes = {
  modalControl: ModalControlType<AddLessonModalPropTypes>;
  afterAdd: (item: LessonItemModel) => void;
  afterUpdate: (id: number, name: string) => void;
};

export const AddLessonModal: FC<PropTypes> = (props) => {
  const { modalControl, afterAdd, afterUpdate } = props;

  const { closeModal, modalProps } = modalControl;

  const { lessonDetails, chapterId, isPrivate } = modalProps;

  const [form] = Form.useForm();

  const addLessonState = useStore($addLesson.store);
  const updateLessonState = useStore($updateLesson.store);

  const [ uploadedPhoto, setUploadedPhoto ] = useState(undefined);
  const [ photoUrl, setPhotoUrl ] = useState<any>("");

  useEffect(() => {
    if (lessonDetails) {
      form.setFieldsValue({
        name: lessonDetails.name
      });

      if (lessonDetails.img) {
        setPhotoUrl(`${imagesBaseUrl}/lessons/${lessonDetails.img}`);
      }
    }

    return () => {
      $addLesson.reset();
    };
  }, []);

  useEffect(() => {
    if (addLessonState.data) {
      notificationSuccess("Урок добавлен", "");

      closeModal();

      afterAdd(addLessonState.data);
    }
  }, [addLessonState.data]);

  useEffect(() => {
    if (updateLessonState.data) {
      notificationSuccess("Данные обновлены", "");

      closeModal();

      afterUpdate(updateLessonState.data, form.getFieldValue("name"));
    }
  }, [updateLessonState.data]);

  const onCancelClick = () => {
    closeModal();
  };

  const beforeUploadPhoto = (file: any) => {
    const correspondType = isFileCorrespondType(file, UPLOAD_FILE_TYPES.PIC);
    const correspondSize = isFileCorrespondSize(file, 10);

    if (!correspondType) {
      message.warning("Можно загрузить только JPG/PNG файлы")
      return false;
    }

    if (!correspondSize) {
      message.warning("Размер не более 10 мб");

      return false;
    }

    if (correspondType && correspondSize) {
      setUploadedPhoto(file);
    }

    return false;
  };

  const onPhotoChange = async (info: any) => {
    const preview = await getBase64(info.file);

    setPhotoUrl(preview);
  };

  const onRemovePhoto = () => {
    setUploadedPhoto(undefined);
    setPhotoUrl("");
  };

  const onFinish = (formData) => {
    const data = new FormData();

    if (uploadedPhoto) {
      data.append("img", uploadedPhoto);
    }

    data.append("chapterId", String(chapterId));
    data.append("name", formData.name);

    if (chapterId) {
      data.append("isPrivate", String(isPrivate));
    } else {
      data.append("isPrivate", String(formData.isPrivate));
    }

    if (lessonDetails) {
      $updateLesson.effect({
        id: lessonDetails.id,
        data
      });
    } else {
      $addLesson.effect(data);
    }
  };

  return (
    <>
      <ModalUI.Loading show={addLessonState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Добавить урок</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI
          phantomSubmit
          initialValues={{ isPrivate: true }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item>
            <div className={`uploadPhoto ${photoUrl ? "has-photo" : ""}`}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUploadPhoto}
                onChange={onPhotoChange}
              >
                {photoUrl ? <img src={photoUrl} alt="category-photo" style={{ width: '100%' }} /> : (
                  <div className="uploadPhotoEmpty">
                    <div>
                      <AddPlusSvgIcon />
                    </div>
                    <div>
                      <span>Фото</span>
                    </div>
                  </div>
                )}
              </Upload>
              {!!photoUrl && (
                <ButtonUI
                  type="primary"
                  withIcon
                  onClick={onRemovePhoto}
                >
                  Del
                </ButtonUI>
              )}
            </div>
          </Form.Item>
          <FormUI.Item label="Название" name="name" rules={requiredRules}>
            <InputUI placeholder="Введите название урока" />
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
              Сохранить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};