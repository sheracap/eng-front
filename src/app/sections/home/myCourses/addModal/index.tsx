import React, { FC, useEffect, useState } from "react";

import { imagesBaseUrl, requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { $addCourse, $courseDetails, $updateCourse } from "#stores/courses";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form, message, Upload } from "antd";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";
import { InputUI } from "#ui/input";
import { CheckboxUI } from "#ui/checkbox";
import { getBase64, isFileCorrespondSize, isFileCorrespondType, UPLOAD_FILE_TYPES } from "#utils/index";
import { notificationSuccess } from "#ui/notifications";
import { AddPlusSvgIcon } from "#src/assets/svg";

export type AddCourseModalType = {
  id?: number;
}

type PropTypes = {
  modalControl: ModalControlType<AddCourseModalType>;
  callback?: () => void;
};

export const AddCourseModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const { id: courseId } = modalControl.modalProps;

  const history = useHistory();

  const [form] = Form.useForm();

  const addCourseState = useStore($addCourse.store);
  const updateCourseState = useStore($updateCourse.store);
  const { data: courseDetails } = useStore($courseDetails.store);

  const [ uploadedPhoto, setUploadedPhoto ] = useState(undefined);
  const [ photoUrl, setPhotoUrl ] = useState<any>("");

  useEffect(() => {
    if (courseId && courseDetails) {
      form.setFieldsValue({
        name: courseDetails.name,
        description: courseDetails.description,
        isPrivate: courseDetails.isPrivate
      });

      if (courseDetails.img) {
       setPhotoUrl(`${imagesBaseUrl}/courses/${courseDetails.img}`);
      }
    }

    return () => {
      $addCourse.reset();
      $updateCourse.reset();
    };
  }, []);

  useEffect(() => {
    if (addCourseState.data) {
      modalControl.closeModal();

      history.push(`/courses/${addCourseState.data.id}`);
    }
  }, [addCourseState.data]);

  useEffect(() => {
    if (updateCourseState.data) {
      notificationSuccess("Данные обновлены", "");
      modalControl.closeModal();
      callback && callback();
    }
  }, [updateCourseState.data]);

  const beforeUploadPhoto = (file: any) => {
    const correspondType = isFileCorrespondType(file, UPLOAD_FILE_TYPES.PIC);
    const correspondSize = isFileCorrespondSize(file, 1);

    if (!correspondType) {
      message.warning("Можно загрузить только JPG/PNG файлы")
      return false;
    }

    if (!correspondSize) {
      message.warning("Размер не более 1 мб");

      return false;
    }

    if (correspondType && correspondSize) {
      onPhotoChange(file);
      setUploadedPhoto(file);
    }

    return false;
  };

  const onPhotoChange = async (file: any) => {
    const preview = await getBase64(file);

    setPhotoUrl(preview);
  };

  const onRemovePhoto = () => {
    setUploadedPhoto(undefined);
    setPhotoUrl("");
  };

  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = (formData) => {
    const data = new FormData();

    if (uploadedPhoto) {
      data.append("img", uploadedPhoto);
    }

    data.append("name", formData.name);
    data.append("isPrivate", formData.isPrivate);
    data.append("description", formData.description);

    if (courseId) {
      $updateCourse.effect({ id: courseId, data });
    } else {
      $addCourse.effect(data);
    }
  };

  return (
    <>
      <ModalUI.Loading show={addCourseState.loading || updateCourseState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>{courseId ? "Редактирование" : "Добавить курс"}</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish} initialValues={{ isPrivate: true }}>
          <Form.Item>
            <div className={`uploadPhoto ${photoUrl ? "has-photo" : ""}`}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUploadPhoto}
                accept="image/png, image/jpg, image/jpeg"
              >
                <div>
                  {photoUrl ? <img src={photoUrl} alt="category-photo" /> : (
                    <div className="uploadPhotoEmpty">
                      <div>
                        <AddPlusSvgIcon />
                      </div>
                      <div>
                        <span>Фото</span>
                      </div>
                    </div>
                  )}
                </div>
              </Upload>
            </div>
          </Form.Item>
          <FormUI.Item label="Название" name="name" rules={requiredRules}>
            <InputUI placeholder="Введите название курса" />
          </FormUI.Item>
          <FormUI.Item label="Описание" name="description">
            <InputUI.TextArea placeholder="Введите описание" />
          </FormUI.Item>
          {/*<FormUI.Item name="isPrivate" valuePropName="checked">*/}
          {/*  <CheckboxUI>Приватный (виден только мне)</CheckboxUI>*/}
          {/*</FormUI.Item>*/}
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
              {courseId ? "Сохранить" : "Добавить"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
