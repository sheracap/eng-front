import React, { FC, useEffect, useState } from "react";

import { $addBook } from "#stores/books";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";

import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form, message, Upload } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";
import { LanguageSelect } from "#pickers/languageSelect";
import { LevelSelect } from "#pickers/levelSelect";
import { AddPlusSvgIcon } from "#src/assets/svg";
import { getBase64, isFileCorrespondSize, isFileCorrespondType, UPLOAD_FILE_TYPES } from "#utils/index";
import { $currentUser } from "#stores/account";


export type AddBookModalType = {

}

type PropTypes = {
  modalControl: ModalControlType<AddBookModalType>;
};

export const AddBookModal: FC<PropTypes> = (props) => {
  const { modalControl } = props;

  const [form] = Form.useForm();

  const addBookState = useStore($addBook.store);

  const [ uploadedPhoto, setUploadedPhoto ] = useState(undefined);
  const [ photoUrl, setPhotoUrl ] = useState<any>("");


  useEffect(() => {

    return () => {
      $addBook.reset();
    };
  }, []);

  useEffect(() => {
    if (addBookState.data) {
      modalControl.closeModal();
    }
  }, [addBookState.data]);

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

    if (uploadedPhoto) {
      data.append("img", uploadedPhoto);
    }

    data.append("title", formData.name);
    data.append("description", formData.description);
    data.append("language", formData.language);
    data.append("level", formData.level);

    $addBook.effect(data);
  };

  return (
    <>
      <ModalUI.Loading show={addBookState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Добавить</ModalUI.Title>
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

          <FormUI.Item label="Заголовок" name="title" rules={requiredRules}>
            <InputUI placeholder="Введите заголовок" />
          </FormUI.Item>

          <Form.Item label="Язык обучения" name="language" rules={requiredRules}>
            <LanguageSelect />
          </Form.Item>

          <Form.Item label="Уровень" name="level" rules={requiredRules}>
            <LevelSelect />
          </Form.Item>

          <FormUI.Item label="Описание" name="description">
            <InputUI.TextArea placeholder="Введите описание" />
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
              Добавить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
