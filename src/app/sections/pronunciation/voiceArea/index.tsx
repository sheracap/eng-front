// @ts-nocheck
import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import { $textForReadingDetails } from "#stores/textForReading";
import { $myTextForReading, $selectedTextIdForReading } from "#src/app/sections/pronunciation/effector";

import { MicrophoneIcon, PlayIcon, RefreshSvgIcon, StopIcon } from "#src/assets/svg";

import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";

import { useModalControl } from "#hooks/useModalControl";
import {
  SpeakingVoiceRecorderResultModal,
  SpeakingVoiceRecorderResultModalType
} from "./resultModal";

export function levenshteinDistance(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => []);

  for (let i = 0; i <= a.length; i++) {
    for (let j = 0; j <= b.length; j++) {
      if (i === 0) {
        matrix[i][j] = j;
      } else if (j === 0) {
        matrix[i][j] = i;
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[a.length][b.length];
}

export function textSimilarityRate(text1: string, text2) {
  const updatedText1 = text1.replace(/[!.,]/g, "").toLowerCase();
  const updatedText2 = text2.replace(/[!.,]/g, "").toLowerCase();

  const distance = levenshteinDistance(updatedText1, updatedText2);
  const maxLength = Math.max(updatedText1.length, updatedText2.length);
  return  Math.ceil((1 - distance / maxLength) * 100);
}

export const SpeakingVoiceRecorder = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const speakingVoiceRecorderResultModalControl = useModalControl<SpeakingVoiceRecorderResultModalType>();

  useEffect(() => {
    return () => {
      stopListening();
      resetTranscript();
    }
  }, []);

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const onCheckClick = () => {
    const { data: textForReadingDetailsData } = $textForReadingDetails.store.getState();
    const selectedTextId = $selectedTextIdForReading.store.getState();
    const myText = $myTextForReading.store.getState();

    stopListening();

    let res = undefined;

    if (selectedTextId) {
      res = textSimilarityRate(textForReadingDetailsData[selectedTextId].text, transcript);
    } else {
      res = textSimilarityRate(myText, transcript);
    }

    speakingVoiceRecorderResultModalControl.openModal({
      res
    })
  }

  return (
    <div className="speaking-voice-recorder content-block">
      {!listening && !transcript && (
        <div className="play-btn-wrap" onClick={startListening}>
          <div className="play-btn">
            <PlayIcon />
          </div>
          <div className="play-btn-text">Начать</div>
        </div>
      )}

      {listening && (
        <>
          {!transcript && (
            <div className="microphone-wrap">
              <div className="microphone-wrap__icon">
                <MicrophoneIcon />
              </div>
              <div className="microphone-wrap__text">Говорите</div>
            </div>
          )}
        </>
      )}

      {transcript && (
        <div className="speaking-voice-recorder__transcript">
          <div className="speaking-voice-recorder__transcript__actions">

            <ButtonUI withIcon size="small" type="primary" onClick={stopListening} disabled={!listening}>
              <StopIcon /> Стоп
            </ButtonUI>
            <ButtonUI withIcon size="small" type="primary" onClick={startListening} disabled={!!listening}>
              <PlayIcon /> Продолжить
            </ButtonUI>
            <ButtonUI withIcon size="small" type="primary" onClick={resetTranscript}>
              <RefreshSvgIcon /> Сбросить
            </ButtonUI>
          </div>
          <div className="speaking-voice-recorder__transcript__text u-fancy-scrollbar">
            {transcript}
            {listening && (
              <span className="speaking-voice-recorder__transcript__mark"></span>
            )}
          </div>
          <div className="speaking-voice-recorder__transcript__check">
            <ButtonUI
              type="primary"
              size="small"
              onClick={onCheckClick}
            >
              Проверить
            </ButtonUI>
          </div>
        </div>
      )}


      <ModalUI
        open={speakingVoiceRecorderResultModalControl.modalProps.open}
        onCancel={speakingVoiceRecorderResultModalControl.closeModal}
        width={600}
      >
        <SpeakingVoiceRecorderResultModal modalControl={speakingVoiceRecorderResultModalControl} />
      </ModalUI>
    </div>
  );
};