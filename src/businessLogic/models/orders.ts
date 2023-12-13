import { StockProductCodesItem } from "#businessLogic/models/common";
import { SelectOptionType } from "#types/common";

export type OrdersListParamsType = {
  search?: string;
  companyId?: string;
  clientId?: string;
  status?: string;
  branchId?: string;
  agentId?: string;
  creatorId?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
  size?: number;
};

export type OrdersListAuxiliariesParamsTypes = {
  statusName?: string;
  branchName?: string;
  companyName?: string;
  creatorName?: string;
};

export type OrderProductCodesParamsType = {
  id: string;
  orderProductId: string;
};

export interface OrdersListItemModel {
  branch: {
    id: number;
    name: string;
  } | null;
  company: {
    id: number;
    name: string;
  };
  creator: {
    id: number;
    name: string;
  };
  customer: {
    id: number;
    name: string;
    tin: string;
  };
  id: number;
  orderDate: string;
  orderNumber: string;
  status: {
    code: string;
    name: string;
  };
  stock: {
    date: string;
    id: number;
    name: string;
  };
}

export interface OrderProductItem {
  barcode: string;
  capacity: string;
  catalogPrice: number;
  hasMark: boolean;
  id: number;
  name: string;
  orderProductId: number;
  price: number;
  productType: ProductType;
  qty: number;
  qtyInPackage: number;
  qtyInWarehouse: number;
  totalPrice: number;
  totalVatPrice: number;
  unit: Unit;
  vatBarcode: string;
  vatPrice: number;
  vatRate: number;
}

interface ProductType {
  code: string;
  codeNumber: number;
  name: string;
  productGroup: string;
  templateId: number;
}

interface Unit {
  code: string;
  id: number;
  measureId: number;
  name: string;
}

export interface OrderDetailsModel extends OrdersListItemModel {
  products: Array<OrderProductItem>;
  description: string;
  contract: {
    contractDate: string;
    contractNumber: string;
    id: number;
  } | null;
  warehouse: {
    id: number;
    name: string;
  } | null;
  saleType: {
    code: string;
    name: string;
  };
  deliveryBranch: {
    id: number;
    name: string;
  };
}

export interface OrderProductCodesModel {
  AGGREGATION: Array<StockProductCodesItem>;
  BLOCK: Array<StockProductCodesItem>;
  MARK: Array<StockProductCodesItem>;
}

export type OrdersStatusesModel = Array<SelectOptionType>;
