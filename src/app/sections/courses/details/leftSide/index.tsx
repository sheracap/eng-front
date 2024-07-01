import React from "react";

import styles from "./styles.module.scss";

export const CourseDetailsLeftSide = (props) => {
  const { data } = props;

  return (
    <div className={styles.courseDetailsLeftSide}>
      <div className={styles.courseDetailsImage}>

      </div>
      <div className={styles.courseDetailsName}>{data.name}</div>
      {data.sections && data.sections.length > 0 && (
        <div>
          <div className={styles.sectionsTitle}>Разделы / Секции</div>
          <div className={styles.sections}>
            {data.sections.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
};