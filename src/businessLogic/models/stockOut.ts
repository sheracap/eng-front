import { StockProductCodesItem } from "#businessLogic/models/common";
import { SelectOptionType } from "#types/common";

export type StockOutListParamsType = {
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
  customerId?: string;
  aggregationCode?: string;
  transportCode?: string;
  markCode?: string;
  barcode?: string;
};

export type StockOutListAuxiliariesParamsType = {
  statusName?: string;
  companyName?: string;
  branchName?: string;
  warehouseName?: string;
  customerName?: string;
  searchKey?: string;
};

export type StockOutProductCodesParamsType = {
  id: string;
  stockProductId: string;
};

export interface StockOutListItemModel {
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

export interface StockOutProductItem {
  aggregationBlockQty: number;
  aggregationQty: number;
  barcode: string;
  capacity: string;
  catalogPrice: number;
  hasMark: true;
  hasMarking: true;
  id: number;
  markQty: number;
  markupPercent: number;
  markupPrice: number;
  name: string;
  productType: {
    code: string;
    codeNumber: number;
    name: string;
    productGroup: string;
    templateId: number;
  };
  purchasePrice: number;
  purchasePriceWithoutVat: number;
  qty: number;
  qtyInPackage: number;
  qtyInWarehouse: number;
  sellingPrice: number;
  sellingPriceWithoutVat: number;
  stockProductId: number;
  totalPurchasePrice: number;
  totalPurchasePriceWithoutVat: number;
  totalSellingPrice: number;
  totalSellingPriceWithoutVat: number;
  totalVatPrice: number;
  unit: {
    code: string;
    id: number;
    measureId: number;
    name: string;
  };
  vatBarCode: string;
  vatPrice: number;
  vatRate: number;
}

export interface StockOutDetailsModel extends StockOutListItemModel {
  products: Array<StockOutProductItem>;
  description: string;
  stockIn: {
    id: number;
    name: string;
  } | null;
}

export interface StockOutProductCodesModel {
  AGGREGATION: Array<StockProductCodesItem>;
  BLOCK: Array<StockProductCodesItem>;
  MARK: Array<StockProductCodesItem>;
}

export type StockOutStatusesModel = Array<SelectOptionType>;
