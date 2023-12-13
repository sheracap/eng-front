import React from "react";

import { CloseCrossSvgIcon, CrossSvgIcon } from "#svgIcons/index";
import { ErrorResponse } from "#types/apiResponseModels";
import { ButtonUI } from "#ui/button";
import { Spinner } from "#ui/spinner";
import { Alert, Modal } from "antd";

import { useStyles } from "./styles";

const ModalUI = (props: any) => {
  const { className = "", width = 450, footer = false, ...restProps } = props;

  useStyles();

  let classesCompose = "custom-modal";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return (
    <Modal
      {...restProps}
      className={classesCompose}
      wrapClassName={"custom-modal-wrap"}
      width={width}
      footer={footer}
      closeIcon={<CloseCrossSvgIcon />}
      destroyOnClose={true}
    />
  );
};

const Header = (props: any) => {
  const { onCancelClick, children } = props;

  return (
    <div className={`custom-modal__header`}>
      {children}
      {onCancelClick && (
        <div className={`custom-modal__header__cancelBtnWr`}>
          <ButtonUI icon={<CrossSvgIcon />} onClick={onCancelClick} />
        </div>
      )}
    </div>
  );
};

const Title = (props: any) => {
  return <div className="custom-modal__title">{props.children}</div>;
};

const Footer = (props: any) => {
  return <div className={`custom-modal__footer`}>{props.children}</div>;
};

const Middle = (props: any) => {
  return <div className="custom-modal__middle u-fancy-scrollbar">{props.children}</div>;
};

const Buttons = (props: any) => {
  return <div className={`custom-modal__buttons`}>{props.children}</div>;
};

const ButtonCol = (props: any) => {
  const { ...restProps } = props;

  return (
    <div className={`custom-modal__buttons__col`} {...restProps}>
      {props.children}
    </div>
  );
};

type LoadingPropsType = {
  show: boolean;
};

const Loading: React.FC<LoadingPropsType> = ({ show }) => {
  if (show) {
    return (
      <div className="abs-loader">
        <Spinner />
      </div>
    );
  }

  return null;
};

type ErrorPropsType = {
  error?: ErrorResponse;
};

const Error: React.FC<ErrorPropsType> = ({ error }) => {
  if (!error) return null;

  return <Alert className="custom-modal__error" message={error.title} type="error" />;
};

ModalUI.Header = Header;
ModalUI.Title = Title;
ModalUI.Footer = Footer;
ModalUI.Middle = Middle;
ModalUI.Buttons = Buttons;
Buttons.Col = ButtonCol;

ModalUI.Loading = Loading;
ModalUI.Error = Error;

export { ModalUI };
