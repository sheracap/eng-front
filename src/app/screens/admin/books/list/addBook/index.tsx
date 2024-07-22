import React, { FC, useEffect, useState } from "react";

import { $addBook, $updateBook } from "#stores/books";

import { imagesBaseUrl, requiredRules } from "#constants/index";
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

import { BookDetailsModel } from "#businessLogic/models/books";


export type AddBookModalType = {
  bookDetails?: BookDetailsModel;
}

type PropTypes = {
  modalControl: ModalControlType<AddBookModalType>;
  callback: () => void;
};

export const AddBookModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const { bookDetails } = modalControl.modalProps;

  const [form] = Form.useForm();

  const addBookState = useStore($addBook.store);
  const updateBookState = useStore($updateBook.store);

  const [ uploadedPhoto, setUploadedPhoto ] = useState(undefined);
  const [ photoUrl, setPhotoUrl ] = useState<any>("");


  useEffect(() => {
    if (bookDetails) {
      form.setFieldsValue({
        title: bookDetails.title,
        description: bookDetails.description,
        language: bookDetails.language,
        level: bookDetails.level
      });

      if (bookDetails.img) {
        setPhotoUrl(`${imagesBaseUrl}/books/${bookDetails.img}`);
      }
    }

    return () => {
      $addBook.reset();
    };
  }, []);

  useEffect(() => {
    if (addBookState.data || updateBookState.data) {
      modalControl.closeModal();

      callback();
    }
  }, [addBookState.data, updateBookState.data]);

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

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("language", formData.language);
    data.append("level", formData.level);

    if (bookDetails) {
      $updateBook.effect({
        id: bookDetails.id,
        data
      });
    } else {
      $addBook.effect(data);
    }
  };

  return (
    <>
      <ModalUI.Loading show={addBookState.loading || updateBookState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>{bookDetails ? "Редактировать" : "Добавить"}</ModalUI.Title>
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

          <FormUI.Item label="Название" name="title" rules={requiredRules}>
            <InputUI placeholder="Введите название" />
          </FormUI.Item>

          <Form.Item label="Язык обучения" name="language" rules={requiredRules}>
            <LanguageSelect />
          </Form.Item>

          <Form.Item label="Уровень" name="level" rules={requiredRules}>
            <LevelSelect />
          </Form.Item>

          <FormUI.Item label="Описание" name="description">
            <InputUI.TextArea placeholder="Введите описание" rows={5} />
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
              {bookDetails ? "Сохранить" : "Добавить"}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
