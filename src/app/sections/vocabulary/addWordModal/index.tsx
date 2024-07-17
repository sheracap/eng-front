import React, { FC, useEffect, useMemo } from "react";
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
import { $currentUser } from "#stores/account";

type PropTypes = {
  modalControl: ModalControlType;
  callback: (item: WordItemModel) => void;
};

let abortController: undefined | AbortController = undefined;

async function translate(text, targetLanguage, sourceLang) {
  const apiKey = 'AIzaSyBCg5tXL5toVZLX63VuuUlFHvoV5ZlloLk'; // todo TEST KEY WITH LIMIT in future make key for your domain
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;


  try {
    abortController && abortController.abort();
    abortController = new AbortController();

    const response = await axios.post(
      apiUrl,
      {
        q: text,
        target: targetLanguage,
        source: sourceLang
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

export const myCurrentLang = "ru";

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
    if (createWordState.data) {
      notificationSuccess("Слово добавлено", "");

      modalControl.closeModal();

      callback(createWordState.data);
    }
  }, [createWordState.data]);

  const sourceLang = useMemo(() => {
    const currentUserState = $currentUser.store.getState();

    if (currentUserState.data!.language === "KOREAN") {
      return "ko";
    } else {
      return "en";
    }
  }, []);

  const onWordChange = (e) => {
    const text = e.target.value;

    withDebounce(() => {
      translate(text, "ru", sourceLang)
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
      value: formData.word,
      transcription: formData.transcription ? formData.transcription : undefined,
      translate: {
        [myCurrentLang]: formData.translate
      },
      wordCategoryId: undefined
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
        <FormUI phantomSubmit form={form} onFinish={onFinish}>
          <div>
            <div>
              lang picker default EN-RU
              <FormUI.Item label="Слово" name="word" rules={requiredRules}>
                <InputUI
                  placeholder="Введите слово"
                  onChange={onWordChange}
                />
              </FormUI.Item>
            </div>
            <div>
              <FormUI.Item label="Перевод" name="translate" rules={requiredRules}>
                <InputUI />
              </FormUI.Item>
            </div>
          </div>
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
