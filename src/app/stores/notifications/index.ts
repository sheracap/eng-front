
import { XHRDataState, XHRSuccessState } from "#constructors/store";
import { createXHRStore } from "#core/effector";
import { StoreType, StoreTypeWithData } from "#core/effector/types/store";
import { api } from "src/businessLogic/api";
import { NotificationItemModel } from "#businessLogic/models/notifications";


export const $notifications = createXHRStore<void, Array<NotificationItemModel>, StoreTypeWithData<Array<NotificationItemModel>>>(
  api.notifications.getNotifications,
  new XHRDataState([]),
);

export const $newNotificationsCount = createXHRStore<void, number, StoreTypeWithData<number>>(
  api.notifications.getNewNotificationsCount,
  new XHRDataState(0),
);
