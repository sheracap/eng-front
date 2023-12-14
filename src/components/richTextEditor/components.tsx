import React from "react";
import ReactDOM from "react-dom";
import { cx, css } from "@emotion/css";

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: any,
    ref
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
          ? active
            ? 'white'
            : '#aaa'
          : active
            ? 'black'
            : '#ccc'};
        `
      )}
    />
  )
);

export const Icon = React.forwardRef(
  (
    { className, ...props }: any,
    ref
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        'material-icons',
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
        `
      )}
    />
  )
)

export const Menu = React.forwardRef(
  (
    { className, ...props }: any,
    ref
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
)

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: any,
    ref
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        "richTextToolbar"
      )}
    />
  )
)