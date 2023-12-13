import { notification } from "antd";

export const notificationInfo = (title, text) => {
  notification.info({
    message: title,
    description: text,
    placement: "topRight",
  });
};

export const notificationSuccess = (title, text, duration) => {
  notification.success({
    message: title,
    description: text,
    placement: "topRight",
    duration: duration || 2,
  });
};

export const notificationWarning = (title, text, duration) => {
  notification.warning({
    message: title,
    description: text,
    placement: "topRight",
    duration: duration || 3,
  });
};

export const notificationError = (title, text, duration) => {
  notification.error({
    message: title,
    description: text,
    placement: "topRight",
    duration: duration || 3,
  });
};
