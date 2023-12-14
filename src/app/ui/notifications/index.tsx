import { notification } from "antd";

export const notificationInfo = (title, text) => {
  notification.info({
    message: title,
    description: text,
    placement: "topRight",
  });
};

export const notificationSuccess = (title, text) => {
  notification.success({
    message: title,
    description: text,
    placement: "topRight",
    duration: 2,
  });
};

export const notificationWarning = (title, text) => {
  notification.warning({
    message: title,
    description: text,
    placement: "topRight",
    duration: 3,
  });
};

export const notificationError = (title, text) => {
  notification.error({
    message: title,
    description: text,
    placement: "topRight",
    duration: 3,
  });
};
