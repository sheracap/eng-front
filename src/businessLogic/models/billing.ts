export type EmployeeBonusListParamsType = {
  search?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  invoiceStatus?: string;
  managerName?: string;
  managerId?: string;
  appType?: string;
};

export type EmployeeBonusListAuxiliariesParamsType = {
  managerName?: string;
};

export interface EmployeeBonusListItemModel {
  amount: number;
  appType: string;
  createdDate: string;
  customerId: number;
  customerName: string;
  customerTin: string;
  entity: string;
  entityId: number;
  id: string;
  invoiceId: string;
  invoiceStatus: {
    code: string;
    nameRu: string;
    nameUzCyrillic: string;
    nameUzLatin: string;
  };
  managerFirstName: string;
  managerLastName: string;
  managerPatronymic: string | null;
  totalPriceWithVat: number;
  xizmatId: number;
  xizmatName: string;
}

export type AgreementsListParamsType = {
  search?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  companyId?: string;
  serviceType?: string;
  tin?: string;
};

export type AgreementsListAuxiliariesParamsTypes = {
  companyName?: string;
};

export interface AgreementsListItemModel {
  id: number;
  instances: number;
  lastName: string;
  lastPeriodStart: string;
  lastPeriodEnd: string;
  login: string;
  quoteId: string;
  agreementNumber: string;
  serviceType: {
    code: string;
    nameRu: string;
    nameUzCyrillic: string;
    nameUzLatin: string;
    selectable: boolean;
  };
  status: {
    code: string;
    nameRu: string;
    nameUzCyrillic: string;
    nameUzLatin: string;
    selectable: boolean;
  };
  total: number;
  trial: boolean;
  title: string;
  xizmat: any;
}

type AgreementCategoryItemModel = {
  code: string;
  nameRu: string;
  id: string;
  nameUzCyrillic: string;
  nameUzLatin: string;
  selectable: boolean;
};

export type AgreementCategoriesListModel = Array<AgreementCategoryItemModel>;
