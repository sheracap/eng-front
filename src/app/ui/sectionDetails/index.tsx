import React, { FC, ReactElement } from "react";

import { useStyles } from "./styles";

type PropTypes = {
  className?: string;
  items: Array<{ title: string; value: ReactElement | string }>;
};

export const SectionDetails: FC<PropTypes> = (props) => {
  const { className, items } = props;

  const classes = useStyles();

  let classesCompose = classes.details;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return (
    <div className={classesCompose}>
      {items.map((item, index) => (
        <div className={classes.item} key={index}>
          {item.title ? <div className={classes.title}>{item.title}:</div> : <></>}
          <div className={classes.body}>{item.value}</div>
        </div>
      ))}
    </div>
  );
};
