
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { api } from "src/businessLogic/api";
import { InvitationAnswerModel, NotificationItemModel } from "#businessLogic/models/notifications";
import { PaginationList } from "#constructors/data";
import { PaginationListModel } from "#types/apiResponseModels";


export const $notifications = createXHRStore<
  void,
  PaginationListModel<NotificationItemModel>,
  StoreTypeWithData<PaginationListModel<NotificationItemModel>>
>(
  api.notifications.getNotifications,
  new XHRDataState(new PaginationList()),
);

export const $newNotificationsCount = createXHRStore<void, number, StoreTypeWithData<number>>(
  api.notifications.getNewNotificationsCount,
  new XHRDataState(0),
);

export const $notificationMarkAsRead = createXHRStore<number, void, StoreType>(
  api.notifications.notificationMarkAsRead,
  new XHRSuccessState(),
);

export const $invitationAnswer = createXHRStore<InvitationAnswerModel, void, StoreType>(
  api.notifications.invitationAnswer,
  new XHRSuccessState(),
);
