import React, { FC, useEffect } from "react";
import { useStore } from "effector-react";
import { Form } from "antd";
import axios from "axios";

import { ModalControlType } from "#hooks/useModalControl";

import { $createWord } from "#stores/words";

import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { InputUI } from "#ui/input";
import { notificationSuccess } from "#ui/notifications";

import { WordItemModel } from "#businessLogic/models/vocabulary";
import { requiredRules } from "#constants/index";
import { debounce } from "#utils/debounceLodash";

type PropTypes = {
  modalControl: ModalControlType;
  callback: (item: WordItemModel) => void;
};

let abortController: undefined | AbortController = undefined;

async function translate(text, targetLanguage) {
  const apiKey = 'AIzaSyBCg5tXL5toVZLX63VuuUlFHvoV5ZlloLk'; // todo TEST KEY WITH LIMIT
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;


  try {
    abortController && abortController.abort();
    abortController = new AbortController();

    const response = await axios.post(
      apiUrl,
      {
        q: text,
        target: targetLanguage,
      },
      {
        signal: abortController.signal
      }
    );

    // Extract translated text from the response
    const translatedText = response.data.data.translations[0].translatedText;

    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return 'Translation failed';
  }
}

export const withDebounce = debounce(
  (action: any) => {
    action();
  },
  500,
  false,
);

export const AddWordModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const [form] = Form.useForm();

  const createWordState = useStore($createWord.store);

  useEffect(() => {


    return () => {
      $createWord.reset();
    };
  }, []);

  useEffect(() => {
    if (createWordState.success) {
      notificationSuccess("Слово добавлено", "");

      modalControl.closeModal();

      callback({
        id: 1,
        value: "sad"
      }); // todo
    }
  }, [createWordState.success]);

  const onWordChange = (e) => {
    const text = e.target.value;

    withDebounce(() => {
      translate(text, "ru")
        .then(translatedText => {
          //console.log('Translated text:', translatedText);

          form.setFieldValue("translate", translatedText);

        })
        .catch(error => {
          console.error('Error:', error);
        });
    });

  }

  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = (formData) => {
    const data = {

    };

    $createWord.effect(data);
  };

  return (
    <>
      <ModalUI.Loading show={createWordState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Добавить слово</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <div>
          <div>
            lang picker default EN-RU
            <FormUI.Item label="Слово" name="word" rules={requiredRules}>
              <InputUI.TextArea
                placeholder="Введите слово"
                onChange={onWordChange}
              />
            </FormUI.Item>
          </div>
          <div>
            <FormUI.Item label="Перевод" name="translate" rules={requiredRules}>
              <InputUI.TextArea />
            </FormUI.Item>
          </div>
        </div>
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
