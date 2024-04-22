import React, { FC, useEffect, useState } from "react";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { $updateUser } from "#stores/account";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form, message, Upload } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";
import { getBase64, isFileCorrespondSize, isFileCorrespondType, UPLOAD_FILE_TYPES } from "#utils/index";
import { notificationSuccess } from "#ui/notifications";
import { AddPlusSvgIcon } from "#src/assets/svg";
import { $currentUser } from "#stores/account";

type PropTypes = {
  modalControl: ModalControlType;
  callback: () => void;
};

export const UserEditModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const [form] = Form.useForm();

  const { data: currentUserData } = useStore($currentUser.store);
  const updateUserState = useStore($updateUser.store);

  const [ uploadedPhoto, setUploadedPhoto ] = useState(undefined);
  const [ photoUrl, setPhotoUrl ] = useState<any>("");

  useEffect(() => {
    if (currentUserData) {
      form.setFieldsValue({
        name: currentUserData.name,
        email: currentUserData.email,
      });

      if (currentUserData.img) {
        setPhotoUrl(`http://localhost:5000/${currentUserData.img}`);
      }
    }

    return () => {
      $updateUser.reset();
    };
  }, []);

  useEffect(() => {
    if (updateUserState.success) {
      notificationSuccess("Данные обновлены", "");
      modalControl.closeModal();
      callback();
    }
  }, [updateUserState.success]);

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
    data.append("email", formData.email);

    $updateUser.effect(data);
  };

  return (
    <>
      <ModalUI.Loading show={updateUserState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Редактировать данные</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <Form.Item
            label="Фото"
          >
            <div className="uploadPhoto">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUploadPhoto}
                accept="image/png, image/jpg, image/jpeg"
              >
                {photoUrl ? <img src={photoUrl} alt="user-photo" style={{ width: '100%' }} /> : (
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
          <FormUI.Item label="Имя" name="name" rules={requiredRules}>
            <InputUI placeholder="Введите имя" />
          </FormUI.Item>
          <FormUI.Item label="Email" name="email" rules={[{ type: "email" }]}>
            <InputUI placeholder="Введите email" />
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
