import React, { FC, useEffect, useState } from "react";
import { Form, Upload, message } from "antd";

import { requiredRules, templateTypes } from "#constants/index";

import { FormUI } from "#ui/form";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { InputUI } from "#ui/input";

import { ExerciseItemModel } from "#businessLogic/models/section";

import { AddPlusSvgIcon, TrashSvgIcon } from "#svgIcons/index";

import styles from "./styles.module.scss";
import { getBase64Photo, isFileCorrespondType, UPLOAD_FILE_TYPES } from "#utils/index";
import { RcFile } from "antd/lib/upload";
import { ExerciseCreateModel, ExerciseUpdateModel } from "#businessLogic/models/exercise";


type PropTypes = {
  editableData?: ExerciseItemModel;
  entityId: number;
  isHomework: boolean;
  closeModal: () => void;
  create: (data: ExerciseCreateModel | any) => void;
  update: (data: ExerciseUpdateModel["data"]) => void;
};

const uploadPhotoLimit = 10;

export const ImagesTemplateForm: FC<PropTypes> = (props) => {
  const { editableData, entityId, isHomework, closeModal, create, update } = props;

  const [form] = Form.useForm();

  const [savedPhotos, setSavedPhotos] = useState<Array<{ id: number; url: string; }>>([]);
  const [removedPhotoIds, setRemovedPhotoIds] = useState<Array<number>>([]);
  const [newPhotos, setNewPhotos] = useState<Array<{ id: number; url: string; }>>([]);
  const [filesForUpload, setFilesForUpload] = useState<Array<{ id: number; file: RcFile; }>>([]);
  const [photosError, setPhotosError] = useState("");

  useEffect(() => {
    if (editableData) {
      form.setFieldsValue({
        title: editableData.title,
        //value: editableData.value,
      });
    }
  }, []);

  const beforeUploadPhoto = (file: RcFile) => {
    const correspondType = isFileCorrespondType(file, UPLOAD_FILE_TYPES.PIC);

    if (!correspondType) {
      message.error("Можно загрузить только JPEG/PNG файлы!");
      return false;
    }

    if (correspondType) {
      const lastFileItem = filesForUpload[filesForUpload.length - 1];
      const id = lastFileItem ? lastFileItem.id + 1 : 1;
      const val = [...filesForUpload, { file, id }];

      setPhotosError("");

      setFilesForUpload(val);

      onPhotoChange(file);
    }

    return false;
  };

  const onPhotoChange = async (file) => {
    const preview = await getBase64Photo(file);

    const lastFileItem = newPhotos[newPhotos.length - 1];
    const id = lastFileItem ? lastFileItem.id + 1 : 1;
    const val = [...newPhotos, { url: preview, id }];

    setNewPhotos(val);
  };

  const onRemoveSavedPhoto = (photoId, index) => {
    const photos = [...savedPhotos];

    const splicedItem = photos.splice(index, 1)[0];

    setRemovedPhotoIds([ ...removedPhotoIds, splicedItem.id ]);

    setSavedPhotos(photos);
  };

  const onRemovePhoto = (index) => {
    const photos = [...newPhotos];
    const photoFiles = [...filesForUpload];

    photos.splice(index, 1);
    photoFiles.splice(index, 1);

    setNewPhotos(photos);
    setFilesForUpload(photoFiles);
  };

  const onFinish = (formData) => {
    const data = new FormData();

    if (filesForUpload.length) {
      filesForUpload.forEach((photo, index) => {
        data.append(`img[${index}]`, photo.file);
      });

      data.append("title", formData.title);
      data.append("sectionId", isHomework ? "" : String(entityId));
      data.append("homeworkId", isHomework ? String(entityId) : "");
      data.append("template", templateTypes.IMAGES);


    } else {
      return;
    }

    if (editableData) {
      // $updateExercise.effect({
      //   id: editableData.id,
      //   ...data,
      // }); // check
    } else {



      create(data);
    }
  };

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Шаблон изображение</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <FormUI.Item label="Заголовок" name="title" rules={requiredRules}>
            <InputUI placeholder="Введите заголовок" />
          </FormUI.Item>
          <div className={styles.formPhotos}>
            <div className={styles.formPhotosList}>
              <div className={`${styles.formPhotosUploadItem} ${photosError ? "has-error" : ""}`}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUploadPhoto}
                  disabled={(savedPhotos.length + newPhotos.length) > (uploadPhotoLimit - 1)}
                >
                  <div className={styles.formPhotosUploadItemPlaceholder}>
                    <span>
                      <AddPlusSvgIcon />
                    </span>
                    <div>Фото</div>
                  </div>
                </Upload>
              </div>
              {savedPhotos.map((item, index) => (
                <div className={styles.formPhotosItem} key={item.id}>
                  <div className={styles.formPhotoItemDelete}>
                    <ButtonUI
                      onClick={() => onRemoveSavedPhoto(item.id, index)}
                    >
                      <TrashSvgIcon />
                    </ButtonUI>
                  </div>
                  <img src={item.url} alt="photo" />
                </div>
              ))}
              {newPhotos.map((item, index) => (
                <div className={styles.formPhotosItem} key={item.id}>
                  <div className={styles.formPhotoItemDelete}>
                    <ButtonUI
                      onClick={() => onRemovePhoto(index)}
                    >
                      <TrashSvgIcon />
                    </ButtonUI>
                  </div>
                  <img src={item.url} alt="photo" />
                </div>
              ))}
            </div>
            {photosError && (
              <div className={`${styles.dangerMessage} ${styles.photosError}`}>{photosError}</div>
            )}
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
