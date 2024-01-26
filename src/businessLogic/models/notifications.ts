export interface NotificationItemModel {
  id: number;
  authorId: number;
  message: string;
  type: NotificationTypes.NEWS | NotificationTypes.INVITATION;
  target: NotificationTargets.COMMON | NotificationTargets.TEACHER | NotificationTargets.STUDENT | null;
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