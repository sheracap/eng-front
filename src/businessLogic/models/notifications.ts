export interface NotificationItemModel {
  id: number;
  author: { id: number; name: string; };
  message: string;
  type: NotificationTypes.NEWS | NotificationTypes.INVITATION;
  target: NotificationTargets.COMMON | NotificationTargets.TEACHER | NotificationTargets.STUDENT | null;
  statuses: Array<any>;
  invitationAnswer: null | boolean;
  createdAt: string;
}

export type InvitationAnswerModel = {
  notificationId: number;
  answer: boolean;
}

enum NotificationTypes {
  INVITATION = "INVITATION",
  NEWS = "NEWS"
}

enum NotificationTargets {
  COMMON = "COMMON",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}