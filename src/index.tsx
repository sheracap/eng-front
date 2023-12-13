import React, { FC } from "react";

import { ConfigProvider } from "antd";
import "antd/dist/antd.less";
import locale from "antd/es/locale/ru_RU";
import { createRoot } from "react-dom/client";

import { App } from "./app";

import "#styles/index.scss";

const Root: FC = () => {
  return (
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  );
};

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(<Root />);
