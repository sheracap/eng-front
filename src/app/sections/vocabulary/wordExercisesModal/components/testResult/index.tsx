import React, { FC, useMemo } from "react";
import { Progress } from "antd";
import { $colors } from "#styles/variables";

type PropsTypes = {
  resultPercent: number;
  correctAnswersCount: number;
  wordsLength: number;
}

export const TestResult: FC<PropsTypes> = (props) => {
  const { resultPercent, correctAnswersCount, wordsLength } = props;

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
    <div className="result-block">
      <Progress
        type="circle"
        width={200}
        strokeColor={resultStatus.color}
        percent={resultPercent}
        format={(percent) => (
          <div className="result-block__body">
            <div>{percent}%</div>
            <span>{correctAnswersCount} из {wordsLength}</span>
          </div>
        )}
      />
      <div className={`result-block__status ${resultStatus.code}`}>
        {resultStatus.name}
      </div>
    </div>
  );
}