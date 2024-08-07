import React, { FC, useMemo } from "react";
import { Progress } from "antd";

import { ModalUI } from "#ui/modal";

import { ModalControlType } from "#hooks/useModalControl";

import { $colors } from "#styles/variables";

export type SpeakingVoiceRecorderResultModalType = {
  res: number;
}

type PropTypes = {
  modalControl: ModalControlType<SpeakingVoiceRecorderResultModalType>;
};

export const SpeakingVoiceRecorderResultModal: FC<PropTypes> = (props) => {
  const { modalControl } = props;

  const { res: resultPercent } = modalControl.modalProps;

  const resultStatus = useMemo(() => {
    let status = {
      code: "great",
      name: "Отлично",
      color: "#009f3c"
    };

    if (resultPercent < 100 && resultPercent > 79) {
      status = {
        code: "good",
        name: "Хорошо",
        color: $colors.orange
      }
    } else if (resultPercent < 80) {
      status = {
        code: "bad",
        name: "Можно лучше",
        color: $colors.danger
      }
    }

    return status;
  }, [resultPercent]);

  return (
    <>
      <ModalUI.Header>
        <ModalUI.Title>Чтение</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <div className="result-block">
          <div className="result-block__title">Ваш результат</div>
          <Progress
            type="circle"
            width={200}
            strokeColor={resultStatus.color}
            percent={resultPercent}
            format={(percent) => (
              <div className="result-block__body">
                <div>{percent}%</div>
              </div>
            )}
          />
          <div className={`result-block__status ${resultStatus.code}`}>
            {resultStatus.name}
          </div>
        </div>
      </ModalUI.Middle>
    </>
  );
};
