import React, { FC, useEffect, useState } from "react";
import { Statistic } from "antd";

import { ButtonUI } from "#ui/button";


type PropsTypes = {
  timerKey: string;
}

const timerTypes = {
  HOUR: 60
};

export const Timer: FC<PropsTypes> = (props) => {
  const { timerKey } = props;

  const [minutes, setMinutes] = useState(timerTypes.HOUR); // timer time in minutes
  const [startedDate, setStartedDate] = useState<{ date: null | number; minutes: number }>({
    date: null,
    minutes: timerTypes.HOUR
  });
  const [showStartBtn, setShowStartBtn] = useState(false);

  useEffect(() => {
    const savedDate = localStorage.getItem(timerKey);

    if (savedDate) {
      const { date: startedDate, minutes: currentTimerMinutes } = JSON.parse(savedDate);

      const minutesDif = (Date.now() - Number(startedDate)) / (1000 * 60);

      if ((currentTimerMinutes - minutesDif) > 0) {
        setStartedDate({
          date: Number(startedDate),
          minutes: Number(currentTimerMinutes)
        });

        setMinutes(Number(currentTimerMinutes));
      } else {
        localStorage.removeItem(timerKey);
        setShowStartBtn(true);
      }
    } else {
      setShowStartBtn(true);
    }
  }, []);

  const onStartTimer = () => {
    const date = String(Date.now());

    localStorage.setItem(timerKey, JSON.stringify({ date, minutes }));

    setStartedDate({
      date: Number(date),
      minutes
    });

    setShowStartBtn(false);
  }

  return (
    <div>
      {showStartBtn && (
        <ButtonUI
          onClick={onStartTimer}
        >
          Start
        </ButtonUI>
      )}
      {startedDate.date && (
        <Statistic.Countdown value={startedDate.date + 1000 * 60 * startedDate.minutes} format="mm:ss" />
      )}
    </div>
  )
}