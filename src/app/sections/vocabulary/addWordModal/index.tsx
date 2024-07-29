import React, { FC, useEffect, useMemo, useState } from "react";
import { useStore } from "effector-react";
import { Form, Spin } from "antd";
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
import { Spinner } from "#ui/spinner";
import { SwapIcon } from "#src/assets/svg";
import { WordCategorySelect } from "#pickers/wordCategorySelect";

export type AddWordModalPropsTypes = {
  word?: string;
}

type PropTypes = {
  modalControl: ModalControlType<AddWordModalPropsTypes>;
  callback?: (item: WordItemModel) => void;
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

const langs = {
  "en": {
    code: "en",
    name: "Английский"
  },
  "ru": {
    code: "ru",
    name: "Русский"
  },
  "ko": {
    code: "ko",
    name: "Корейский"
  },
}

export const AddWordModal: FC<PropTypes> = (props) => {
  const { modalControl, callback } = props;

  const [form] = Form.useForm();

  const createWordState = useStore($createWord.store);

  const [loading, setLoading] = useState(false);
  const [switchLang, setSwitchLang] = useState(false);

  useEffect(() => {
    if (modalControl.modalProps.word) {
      form.setFieldValue("word", modalControl.modalProps.word);
      onWordChange(modalControl.modalProps.word, false);
    }

    return () => {
      $createWord.reset();
    };
  }, []);

  useEffect(() => {
    if (createWordState.data) {
      notificationSuccess("Слово добавлено", "");

      modalControl.closeModal();

      callback && callback(createWordState.data);
    }
  }, [createWordState.data]);

  const learnLang = useMemo(() => {
    const currentUserState = $currentUser.store.getState();

    if (currentUserState.data!.language === "KOREAN") {
      return "ko";
    } else {
      return "en";
    }
  }, []);

  const onWordChange = (text: string, isSw: boolean) => {
    const targetLanguage = isSw ? learnLang : myCurrentLang;
    const sourceLang = isSw ? myCurrentLang : learnLang;

    withDebounce(() => {
      if (!loading) {
        setLoading(true);
      }

      translate(text, targetLanguage, sourceLang)
        .then(translatedText => {
          //console.log('Translated text:', translatedText);

          setLoading(false);

          form.setFieldValue("translate", translatedText);

        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    });

  }

  const onCancelClick = () => {
    modalControl.closeModal();
  };

  const onFinish = (formData) => {
    const data = {
      value: switchLang ? formData.translate : formData.word,
      transcription: formData.transcription ? formData.transcription : undefined,
      translate: {
        [myCurrentLang]: switchLang ? formData.word : formData.translate
      },
      wordCategoryId: formData.wordCategoryId
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
          <div className="translate-fields">
            <div className="translate-fields__item">
              <FormUI.Item
                label={switchLang ? langs[myCurrentLang].name : langs[learnLang].name}
                name="word"
                rules={requiredRules}
              >
                <InputUI
                  placeholder="Введите слово"
                  onChange={(e) => onWordChange(e.target.value, switchLang)}
                />
              </FormUI.Item>
            </div>
            <div className="translate-fields__swap">
              <ButtonUI
                type="primary"
                size="small"
                withIcon
                onClick={() => {
                  setSwitchLang(!switchLang);

                  const { word, translate } = form.getFieldsValue(true);

                  form.setFieldsValue({
                    word: translate,
                    translate: word
                  });

                  onWordChange(translate, !switchLang);
                }}
              >
                <SwapIcon />
              </ButtonUI>
            </div>
            <div className="translate-fields__item">
              <div className="form-item-with-loading" style={{ position: "relative" }}>
                {loading && (
                  <div className="form-item-with-loading__in">
                    <Spinner size="small" />
                  </div>
                )}
                <FormUI.Item
                  label={switchLang ? langs[learnLang].name : langs[myCurrentLang].name}
                  name="translate"
                  rules={requiredRules}
                >
                  <InputUI placeholder="Перевод" readOnly={loading} />
                </FormUI.Item>
              </div>
            </div>
          </div>
          <FormUI.Item
            label="Транскрипция"
            name="transcription"
          >
            <InputUI placeholder="Введите транскрипция" readOnly={loading} />
          </FormUI.Item>
          <FormUI.Item
            label="Категория"
            name="wordCategoryId"
          >
            <WordCategorySelect />
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
