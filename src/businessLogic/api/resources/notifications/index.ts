import { HandlerType } from "#core/effector/types/handler";
import { httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { InvitationAnswerModel, NotificationItemModel } from "#businessLogic/models/notifications";
import { PaginationListModel } from "#types/apiResponseModels";

export const getNotifications: HandlerType<void, PaginationListModel<NotificationItemModel>> = () => {
  return httpGet({ url: "/api/notification" });
};

export const getNewNotificationsCount: HandlerType<void, number> = () => {
  return httpGet({ url: "/api/notification/new-count" });
};

export const notificationMarkAsRead: HandlerType<number, void> = (notificationId) => {
  return httpPost({ url: `/api/notification/read/${notificationId}` });
};

export const invitationAnswer: HandlerType<InvitationAnswerModel, void> = (data) => {
  return httpPost({ url: "/api/invitation//answer", data });
};
