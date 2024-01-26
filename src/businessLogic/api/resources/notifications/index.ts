import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { NotificationItemModel } from "#businessLogic/models/notifications";

export const getNotifications: HandlerType<void, Array<NotificationItemModel>> = () => {
  return httpGet({ url: "/api/notification" });
};

export const getNewNotificationsCount: HandlerType<void, number> = () => {
  return httpGet({ url: "/api/notification/new-count" });
};

