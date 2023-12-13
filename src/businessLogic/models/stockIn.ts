import { StockProductCodesItem } from "#businessLogic/models/common";
import { SelectOptionType } from "#types/common";

export type StockInListParamsType = {
  search?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  status?: string;
  companyId?: string;
  branchId?: string;
  warehouseId?: string;
  aggregationCode?: string;
  transportCode?: string;
  markCode?: string;
  barcode?: string;
};

export type StockInListAuxiliariesParamsType = {
  statusName?: string;
  companyName?: string;
  branchName?: string;
  warehouseName?: string;
  searchKey?: string;
};

export type StockInProductCodesParamsType = {
  id: string;
  stockProductId: string;
};

export interface StockInListItemModel {
  branch: {
    id: number;
    name: string;
  };
  company: {
    id: number;
    name: string;
    tin: string;
  };
  consignmentNumber: string;
  customer: {
    id: number;
    name: string;
    tin: string;
  };
  factura: {
    facturaDate: string;
    facturaId: string;
    facturaNo: string;
    id: number;
    status: string;
    statusName: string;
  } | null;
  facturas: [
    {
      facturaDate: string;
      facturaId: string;
      facturaNo: string;
      id: number;
      status: string;
      statusName: string;
    },
  ];
  id: number;
  oldStock: {
    id: number;
    name: string;
  };
  order: {
    id: number;
    name: string;
  };
  orderDate: string;
  party: {
    id: number;
    name: string;
    partyDate: string;
    partyId: number;
    partyNo: string;
    status: {
      code: string;
      name: string;
    };
    statusName: string;
  };
  status: {
    code: string;
    name: string;
  };
  stockNumber: string;
  stockTransfer: {
    id: number;
    name: string;
  };
  supplier: {
    id: number;
    name: string;
    tin: string;
  };
  totalPrice: number;
  totalPriceWithoutVat: number;
  totalQty: number;
  totalVatPrice: number;
  transferDate: string;
  warehouse: {
    id: number;
    name: string;
  };
  contract: {
    contractDate: string;
    contractNumber: string;
    id: number;
  };
}

export interface StockInProductItem {
  id: number;
  stockProductId: number;
  name: string;
  vatBarCode: number;
  barcode: number;
  qtyInPackage: null | number;
  capacity: string;
  hasMark: boolean;
  productType: {
    name: string;
    code: string;
    codeNumber: number;
    templateId: number;
    productGroup: string;
  };
  qty: number;
  sellingPrice: number;
  sellingPriceWithoutVat: number;
  totalSellingPrice: number;
  totalSellingPriceWithoutVat: number;
  purchasePrice: number;
  purchasePriceWithoutVat: number;
  totalPurchasePrice: number;
  totalPurchasePriceWithoutVat: number;
  markupPrice: number;
  markupPercent: number;
  vatRate: number;
  vatPrice: number;
  totalVatPrice: number;
  unit: {
    id: number;
    name: string;
    code: string;
    measureId: number;
  };
  hasMarking: boolean;
  hasError: boolean;
  aggregationQty: number;
  markQty: number;
  aggregationBlockQty: number;
}

export interface StockInDetailsModel extends StockInListItemModel {
  products: Array<StockInProductItem>;
  description: string;
  stockOut: {
    id: number;
    name: string;
  } | null;
}

export interface StockInProductCodesModel {
  AGGREGATION: Array<StockProductCodesItem>;
  BLOCK: Array<StockProductCodesItem>;
  MARK: Array<StockProductCodesItem>;
}

export type StockInStatusesModel = Array<SelectOptionType>;
