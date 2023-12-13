export type EmployeesListParamsType = {
  search?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  branchId?: string;
  companyId?: string;
};

export type EmployeesListAuxiliariesParamsType = {
  companyName?: string;
  branchName?: string;
};

export type EmployeeLookupParamsType = {
  search?: string;
};

export type EmployeeStatus = {
  id: number;
  status: string;
};

type EmployeeBranchItem = {
  id: number;
  name: string;
};

export interface EmployeesListItemModel {
  id: number;
  name: string;
  branches: EmployeeBranchItem[];
  company: {
    id: number;
    name: string;
  };
  firstName: string;
  lastName: string;
  login: string;
  patronymic: string;
  pinfl: string;
  role: {
    code: string;
    name: string;
  };
  status?: {
    code: string;
    name: string;
  };
  tin: string;
}

export interface EmployeeRoles {
  name: string;
  code: string;
}

export interface EmployeeLookupItemModel {
  firstName?: string;
  id?: number;
  lastName?: string;
  login?: string;
  patronymic?: string;
  phone?: string;
  pinfl?: string;
  tin?: string;
}

export type EmployeesLookupModel = Array<EmployeeLookupItemModel>;

export type EmployeeDetailsModel = EmployeesListItemModel;

export type EmployeeCreateModel = {
  companyId: number | string;
  branches: Array<number | string>;
  firstName: string;
  lastName: string;
  patronymic: string;
  login: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type EmployeePassword = {
  currentPassword: string;
  newPassword: string;
};

export type EmployeeUpdatePassword = {
  id: string | number;
} & EmployeePassword;

export type EmployeeUpdateModel = {
  id: string | number;
} & EmployeeCreateModel;
