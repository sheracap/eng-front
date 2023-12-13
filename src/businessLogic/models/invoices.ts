import { SelectOptionType, SelectOptionWithIdType } from "#types/common";

export type InvoicesListParamsType = {
  search?: string;
  from?: string;
  to?: string;
  status?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  companyId?: string;
  invoiceId?: string;
  sellerId?: string;
  incoming?: boolean;
  facturaType?: string;
  buyerId?: string;
};

export type InvoicesListListAuxiliariesParamsType = {
  companyName?: string;
  customerName?: string;
  sellerName?: string;
  buyerName?: string;
};

export interface InvoicesListItemModel {
  company: {
    id: number;
    name: string;
  };
  buyer: {
    id: number;
    name: string;
    tin: string;
  };
  facturaDate: string;
  facturaId: string;
  facturaNo: string;
  facturaType: {
    code: string;
    id: number;
    name: string;
  };
  id: number;
  seller: {
    id: number;
    name: string;
    tin: string;
  };
  status: string;
  statusName: string;
  stock: {
    id: number;
    name: string;
  };
  total: number;
}

export interface InvoicesSellerAndBuyerTypes {
  Account: string;
  Accountant: string;
  Address: string;
  BankId: string;
  BranchCode: string;
  BranchName: string;
  Director: string;
  DistrictId: string;
  Mobile: string;
  Name: string;
  Oked: string;
  TaxGap: number | string | null;
  VatRegCode: string;
  VatRegStatus: number;
  WorkPhone: string;
  bankName: string;
  districtName: string;
  id: string;
  regionName: string;
  tin: string;
}

export interface InvoiceMarks {
  IdentTransUpak: Array<string>;
  identtransupak: Array<string>;
  KIZ: Array<string>;
  kiz: Array<string>;
  NomUpak: Array<string>;
  nomupak: Array<string>;
  ProductType: null | {
    code: string;
    codeNumber: number;
    name: string;
    productGroup: string;
    templateId: number;
  };
  producttype: null | {
    code: string;
    codeNumber: number;
    name: string;
    productGroup: string;
    templateId: number;
  };
}

export interface InvoiceProduct {
  Barcode: string;
  BaseSumma: number;
  CatalogCode: string;
  CatalogName: string;
  Code: string;
  ComittentName: string;
  ComittentTin: string;
  ComittentVatRegCode: string;
  Count: number;
  DeliverySum: number;
  DeliverySumWithVat: number;
  ExciseRate: number;
  ExciseSum: number;
  LgotaId: number;
  LgotaName: string;
  LgotaType: number;
  LgotaVatSum: number;
  Marks: InvoiceMarks;
  MeasureId: number;
  Name: string;
  OrdNo: string;
  PackageCode: string;
  PackageName: string;
  ProfitRate: number;
  Serial: string;
  Summa: number;
  VatRate: number;
  VatSum: number;
  WithoutVat: true;
  branch: {
    id: number;
    name: string;
  };
  productId: number;
  qtyInWarehouse: number;
  warehouse: {
    id: number;
    name: string;
  };
}

interface InvoiceProductList {
  DeliverySumWithVat: number;
  EmpowermentProductId: string;
  FacturaProductId: string;
  HasComittent: true;
  HasExcise: true;
  HasLgota: true;
  HasMedical: true;
  HasVat: true;
  Products: Array<InvoiceProduct>;
  Tin: string;
}

export interface InvoicesFacturaDoc {
  FacturaDate: string;
  FacturaNo: string;
}

export interface InvoicesContractDoc {
  ContractDate: string;
  ContractNo: string;
}

export interface InvoiceDetailModel {
  facturaId: string;
  status: string;
  statusName: string;
  sendBy: string;
  sendDate: string;
  sendNumber: string;
  approvedBy: string;
  approvedDate: string;
  approvedNumber: string;
  facturaDTO: {
    Buyer: InvoicesSellerAndBuyerTypes;
    Seller: InvoicesSellerAndBuyerTypes;
    ProductList: InvoiceProductList;
    BuyerBranchTin: string;
    BuyerTin: string;
    FacturaDoc: InvoicesFacturaDoc;
    ContractDoc: InvoicesContractDoc;
    EmpowermentId: string;
    FacturaEmpowermentDoc: {
      AgentFacturaId: string;
      AgentFio: string;
      AgentPinfl: string;
      AgentTin: string;
      EmpowermentDateOfIssue: string;
      EmpowermentNo: string;
    };
    FacturaId: string;
    FacturaType: number;
    ForeignCompany: {
      Account: string;
      Address: string;
      Bank: string;
      CountryId: string;
      Name: string;
    };
    HasMarking: true;
    ItemReleasedDoc: {
      ItemReleasedFio: string;
      ItemReleasedPinfl: string;
      ItemReleasedTin: string;
    };
    LotId: string;
    OldFacturaDoc: {
      OldFacturaDate: string;
      OldFacturaId: string;
      OldFacturaNo: string;
    };
  };
}

export type InvoiceDetailsParamsModel = {
  id: number;
  params: boolean;
};

export type InvoiceStatusesModel = Array<SelectOptionType>;

export type InvoiceTypeItemModel = Array<SelectOptionWithIdType>;
