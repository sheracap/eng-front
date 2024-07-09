import React, { FC, useEffect, useState } from "react";

import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { $addChapter } from "#stores/chapter";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form, message, Upload } from "antd";
import { useStore } from "effector-react";
import { InputUI } from "#ui/input";
import { getBase64, isFileCorrespondSize, isFileCorrespondType, UPLOAD_FILE_TYPES } from "#utils/index";
import { AddPlusSvgIcon } from "#src/assets/svg";


export type AddChapterModalPropTypes = {
  courseId: number;
};

type PropTypes = {
  modalControl: ModalControlType<AddChapterModalPropTypes>;
  callback: () => void;
};

export const AddChapterModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const { closeModal, modalProps } = modalControl;

  const { courseId } = modalProps;

  const [form] = Form.useForm();

  const addChapterState = useStore($addChapter.store);

  const [ uploadedPhoto, setUploadedPhoto ] = useState(undefined);
  const [ photoUrl, setPhotoUrl ] = useState<any>("");

  useEffect(() => {
    return () => {
      $addChapter.reset();
    };
  }, []);

  useEffect(() => {
    if (addChapterState.data) {
      closeModal();
      callback();
    }
  }, [addChapterState.data]);

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

    // if (uploadedPhoto) {
    //   data.append("img", uploadedPhoto);
    // }

    data.append("courseId", String(courseId));
    data.append("name", formData.name);

    $addChapter.effect(data);
  };

  return (
    <>
      <ModalUI.Loading show={addChapterState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Добавить главу</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          {/*<Form.Item*/}
          {/*  label="Обложка"*/}
          {/*>*/}
          {/*  <div className="uploadPhoto">*/}
          {/*    <Upload*/}
          {/*      name="avatar"*/}
          {/*      listType="picture-card"*/}
          {/*      className="avatar-uploader"*/}
          {/*      showUploadList={false}*/}
          {/*      beforeUpload={beforeUploadPhoto}*/}
          {/*      onChange={onPhotoChange}*/}
          {/*    >*/}
          {/*      {photoUrl ? <img src={photoUrl} alt="category-photo" style={{ width: '100%' }} /> : (*/}
          {/*        <div className="uploadPhotoEmpty">*/}
          {/*          <div>*/}
          {/*            <AddPlusSvgIcon />*/}
          {/*          </div>*/}
          {/*          <div>*/}
          {/*            <span>Выбрать фото</span>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      )}*/}
          {/*    </Upload>*/}
          {/*    {!!photoUrl && (*/}
          {/*      <ButtonUI*/}
          {/*        type="primary"*/}
          {/*        withIcon*/}
          {/*        onClick={onRemovePhoto}*/}
          {/*      >*/}
          {/*        Del*/}
          {/*      </ButtonUI>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*</Form.Item>*/}
          <FormUI.Item label="Название" name="name" rules={requiredRules}>
            <InputUI placeholder="Введите название главы" />
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
