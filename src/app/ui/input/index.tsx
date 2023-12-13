import React, { FC, useEffect, useState } from "react";

import { SearchIconSvgIcon } from "#svgIcons/index";
import { InputUIPropTypes } from "#types/components";
import { debounce } from "#utils/debounceLodash";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, InputNumber } from "antd";
import cn from "classnames";
import InputMask from "react-input-mask";

import { useStyles } from "./styles";

export const withDebounce = debounce(
  (action: any) => {
    action();
  },
  300,
  false,
);

const InputUI = (props: InputUIPropTypes) => {
  const { className, readOnly, variant, ...restProps } = props;
  const classes = useStyles();
  let classesCompose = `${classes.input} custom-input`;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  if (variant) {
    classesCompose = `${classesCompose} ${classes[variant]}`;
  }

  if (readOnly) {
    classesCompose = `${classesCompose} ${classes.readOnly}`;
  }

  return <Input autoComplete="off" className={classesCompose} readOnly={readOnly} {...restProps} />;
};

const Password = (props: InputUIPropTypes) => {
  const { className, readOnly, variant, ...restProps } = props;
  const classes = useStyles();
  let classesCompose = `${classes.input} custom-input`;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  if (variant) {
    classesCompose = `${classesCompose} ${classes[variant]}`;
  }

  if (readOnly) {
    classesCompose = `${classesCompose} ${classes.readOnly}`;
  }

  return (
    <Input.Password
      autoComplete="off"
      className={classesCompose}
      disabled={readOnly}
      {...restProps}
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
  );
};

const Search = (props: any) => {
  const { className, onChange, value, ...restProps } = props;
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    if (!value) {
      setSearchValue("");
    }
  }, [value]);

  const onSearchChange = (event: any) => {
    const search = event.target.value;
    setSearchValue(search);

    withDebounce(() => {
      onChange(event, search);
    });
  };

  let classesCompose = `${classes.search} custom-input`;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return (
    <InputUI
      className={classesCompose}
      placeholder="Поиск"
      value={searchValue}
      onChange={onSearchChange}
      prefix={
        <div className={classes.searchIcon}>
          <SearchIconSvgIcon />
        </div>
      }
      allowClear
      {...restProps}
    />
  );
};

const Number = React.forwardRef((props: any, ref) => {
  const { className, suffix, ...restProps } = props;

  const classes = useStyles();

  const classesCompose = cn(classes.inputNumber, {
    [className]: !!className,
    [classes.inputNumberDisabled]: props.disabled,
  });

  return (
    <div className={classesCompose}>
      <InputNumber {...restProps} ref={ref} />
      {!!props.suffix && <div className={classes.inputNumber__suffix}>{suffix}</div>}
    </div>
  );
});

export const Phone: FC<InputUIPropTypes> = (props) => {
  return (
    <InputMask mask="+\9\98 (99) 999 99 99" placeholder="Введите номер" maskChar="*" {...props}>
      {(inputProps: any) => <InputUI {...inputProps} />}
    </InputMask>
  );
};

export const Tin: FC<InputUIPropTypes & any> = (props: any) => {
  const { ...restProps } = props;

  return (
    <InputMask mask="999 999 999" placeholder="Введите ИНН" maskChar="*" {...restProps}>
      {(inputProps: any) => <InputUI {...inputProps} />}
    </InputMask>
  );
};

export const Pinfl: FC<InputUIPropTypes & any> = (props: any) => {
  const { ...restProps } = props;

  return (
    <InputMask mask="99999999999999" placeholder="Введите ПИНФЛ" maskChar="*" {...restProps}>
      {(inputProps: any) => <InputUI {...inputProps} />}
    </InputMask>
  );
};

InputUI.TextArea = Input.TextArea;
InputUI.Password = Password;
InputUI.Search = Search;
InputUI.Number = Number;
InputUI.Phone = Phone;
InputUI.Tin = Tin;
InputUI.Pinfl = Pinfl;

export { InputUI };
