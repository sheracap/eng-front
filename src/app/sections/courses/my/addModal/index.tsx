import React, { FC, useEffect, useState } from "react";

import { $addCourse, $courseDetails, $updateCourse } from "#stores/courses";
import { $currentUser } from "#stores/account";

import { imagesBaseUrl, requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";

import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form, message, Upload } from "antd";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";
import { InputUI } from "#ui/input";
import { getBase64, isFileCorrespondSize, isFileCorrespondType, UPLOAD_FILE_TYPES } from "#utils/index";
import { notificationSuccess } from "#ui/notifications";
import { AddPlusSvgIcon } from "#src/assets/svg";
import { LanguageSelect } from "#pickers/languageSelect";
import { LevelSelect } from "#pickers/levelSelect";


export type AddCourseModalType = {
  id?: number;
  isPrivate: boolean;
}

type PropTypes = {
  modalControl: ModalControlType<AddCourseModalType>;
  callback?: () => void;
  isAdmin?: boolean;
};

export const AddCourseModal: FC<PropTypes> = (props) => {
  const { modalControl, callback, isAdmin } = props;

  const { id: courseId, isPrivate } = modalControl.modalProps;

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
        isPrivate: courseDetails.isPrivate,
        level: courseDetails.level
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
    const currentUserState = $currentUser.store.getState();

    if (uploadedPhoto) {
      data.append("img", uploadedPhoto);
    }

    data.append("name", formData.name);
    data.append("isPrivate", String(isPrivate));
    data.append("description", formData.description);
    data.append("language", formData.language || currentUserState.data!.language);
    data.append("level", formData.level);

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
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
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
          <Form.Item label="Уровень" name="level" rules={requiredRules}>
            <LevelSelect />
          </Form.Item>

          {isAdmin && (
            <Form.Item label="Язык" name="language" rules={requiredRules}>
              <LanguageSelect />
            </Form.Item>
          )}

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
