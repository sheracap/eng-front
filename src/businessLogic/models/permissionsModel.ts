export type PermissionsAddRoleModelType = {
  permissionType: string;
  role: string;
  permissions: string[];
};
export type PermissionsAddUserModelType = {
  permissionType: string;
  userId?: number;
  permissions: string[];
};
export type PermissionsByRoleModelType = string[];
