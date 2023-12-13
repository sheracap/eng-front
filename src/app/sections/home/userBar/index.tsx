import React from "react";

// @ts-ignore
import womanPic from "#images/woman.jpg";

import styles from "./styles.module.scss";
import { ButtonUI } from "#ui/button";
import { CalendarIcon } from "#src/assets/svg";
import { useHistory } from "react-router-dom";

export const MainUserBar = () => {
  const history = useHistory();

  return (
    <div className={styles.userBar}>
      <div className={styles.userBarImage}>
        <img src={womanPic} alt="user" />
      </div>
      <div className={styles.userName}>Mrs. Smith</div>
      <div className={styles.userStat}>
        <div>
          <span>Расписание</span>
          <CalendarIcon />
        </div>
        <div>
          <span>Мои ученики</span>
          <strong>(20)</strong>
        </div>
        <div onClick={() => history.push("/home/my-courses")}>
          <span>Мои курсы</span>
          <strong>(10)</strong>
        </div>
        <div>
          <span>Мои уроки</span>
          <strong>(20)</strong>
        </div>
      </div>
      <div>
        <div className={styles.lessonsStartsDesc}>
          Следующий урок <strong>сегодня</strong> в 15:40
        </div>
        <ButtonUI type="primary" fullWidth>
          Начать урок
        </ButtonUI>
      </div>
    </div>
  )
};