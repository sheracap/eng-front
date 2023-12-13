export type StockBalancesListParamsType = {
  search?: string;
  companyId?: string;
  branchId?: string;
  page?: number;
  pageSize?: number;
  size?: number;
  warehouseId?: string;
  categoryId?: string;
  orderBy?: string;
  sortOrder?: string;
};

export type StockBalancesListAuxiliariesParamsTypes = {
  warehouseName?: string;
  branchName?: string;
  companyName?: string;
};

export interface StockBalancesListItemModel {
  id: number;
  name: string;
  qty: number;
  company: {
    id: number;
    name: string;
  };
  branch: {
    id: number;
    name: string;
  };
  warehouse: {
    id: number;
    name: string;
  };
  sellingPrice: number;
  totalSellingPrice: number;
  purchasePrice: number;
  totalPurchasePrice: number;
}

export interface TypeStockInGrandTotal {
  qty: number;
  totalSellingPrice: number;
  totalPurchasePrice: number;
  potentialProfit: number;
}
