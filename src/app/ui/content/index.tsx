import React, { FC, ReactNode } from "react";

import { ArrowRightSvgIcon } from "#src/assets/svg";
import { BackBtn } from "#ui/backBtn";
import { Spinner } from "#ui/spinner";
import { formatNumber } from "#utils/formatters";
import cn from "classnames";
import { useHistory } from "react-router-dom";

import { useStyles } from "./styles";

interface ContentPropTypes {
  className?: string;
  children?: any;
  loading?: boolean;
  fixed?: boolean;
}

type ContentType = FC<ContentPropTypes> & {
  Header: typeof Header;
  Middle: typeof Middle;
};

const ContentUI: ContentType = (props) => {
  const { className, children, loading, fixed } = props;

  useStyles();

  let classesCompose = "custom-content u-fancy-scrollbar";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return (
    <div className={cn(classesCompose, { ["custom-content-fixed"]: fixed })}>
      {loading && (
        <div className="custom-content__loading">
          <Spinner />
        </div>
      )}
      {children}
    </div>
  );
};

interface HeaderPropTypes {
  className?: string;
  title: string | string[] | ReactNode | ReactNode[];
  total?: number;
  backPath?: string;
  onBackClick?: () => void;
  children?: any;
}

const Header: React.FC<HeaderPropTypes> = (props) => {
  const { className = "", title, total, backPath, onBackClick } = props;

  useStyles();

  const history = useHistory();

  const getTitle = () => {
    if (title && Array.isArray(title)) {
      return title.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <span className="custom-content__header__item">{item}</span>
            {index < title.length - 1 && (
              <span className="custom-content__header__separator">
                <ArrowRightSvgIcon />
              </span>
            )}
          </React.Fragment>
        );
      });
    } else {
      return title;
    }
  };

  const getTotal = () => {
    if (!total) return null;

    return (
      <div
        className={cn("custom-content__header__total", { ["custom-content__header__total-with-back-path"]: backPath })}
      >
        <strong> ({formatNumber(total)})</strong>
      </div>
    );
  };

  return (
    <div className={`custom-content__header ${className}`}>
      <div className="custom-content__header__title">
        {(backPath || onBackClick) && (
          <div className="custom-content__header__back-btn">
            <BackBtn history={history} backPath={backPath} onBackClick={onBackClick} />
          </div>
        )}
        {getTitle()}
        {getTotal()}
      </div>
      <div className="custom-content__header__actions">{props.children}</div>
    </div>
  );
};

const Middle = (props: any) => {
  const { className, content, children } = props;

  useStyles();

  let classesCompose = content
    ? "custom-content__middle-content content-block"
    : "custom-content__middle u-fancy-scrollbar";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return (
    <div className={classesCompose}>
      {content ? (
        <div className={cn("custom-content__middle-content__inner", "u-fancy-scrollbar")}>{children}</div>
      ) : (
        children
      )}
    </div>
  );
};

ContentUI.Header = Header;
ContentUI.Middle = Middle;

export { ContentUI };
