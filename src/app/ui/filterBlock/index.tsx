import React, { ReactNode } from "react";

import { CloseCrossSvgIcon, RefreshSvgIcon } from "#src/assets/svg";
import { ButtonUI } from "#ui/button";
import { Tooltip } from "antd";

import { useStyles } from "./styles";

type PropsTypes = {
  className?: string;
  children: ReactNode;
  onReset?: () => void;
  onRefresh?: () => void;
};

const FilterBlockUI = (props: PropsTypes) => {
  const { className = "", children, onReset, onRefresh } = props;

  useStyles();

  let classesCompose = "filter-block";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return (
    <div className={classesCompose}>
      {children}
      <div className="filter-block__actions">
        {onReset && (
          <div className="filter-block__actions__item">
            <Tooltip placement="topRight" title="Сбросить">
              <ButtonUI type="primary" withIcon onClick={() => onReset()}>
                <CloseCrossSvgIcon />
              </ButtonUI>
            </Tooltip>
          </div>
        )}
        {onRefresh && (
          <div className="filter-block__actions__item">
            <Tooltip placement="topRight" title="Обновить">
              <ButtonUI type="primary" withIcon onClick={() => onRefresh()}>
                <RefreshSvgIcon />
              </ButtonUI>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

type FilterBlockItemTypes = {
  children: ReactNode;
};

const FilterBlockItem: React.FC<FilterBlockItemTypes> = ({ children }) => (
  <div className="filter-block__item">{children}</div>
);

const FilterBlockSearchItem: React.FC<FilterBlockItemTypes> = ({ children }) => {
  const classes = useStyles();

  return <div className={`${classes.search} filter-block__item`}>{children}</div>;
};

FilterBlockUI.Item = FilterBlockItem;
FilterBlockUI.SearchItem = FilterBlockSearchItem;

export { FilterBlockUI };
