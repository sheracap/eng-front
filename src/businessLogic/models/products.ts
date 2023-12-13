export type ProductsParamsType = {
  search?: string;
  page?: string;
  pageSize?: string;
  size?: string;
  branchId?: string;
  categoryId?: string;
  companyId?: string;
};

export type ProductsAuxiliariesParamsTypes = {};

export interface ProductsListItemModel {
  id: number;
  name: string;
  price: number;
  unit: {
    code: string;
    id: number;
    measureId: number;
    name: string;
  };
  vat: {
    amount: number;
    code: string;
    name: string;
  };
  vatBarcode: string;
  barcode: string;
  branch: {
    id: number;
    name: string;
  };
  capacity: string;
  category: {
    id: number;
    name: string;
  };
}

export interface ProductDetailsModel extends ProductsListItemModel {
  productType: {
    code: string;
    codeNumber: number;
    name: string;
    productGroup: string;
    templateId: number;
  };
  hasMark: boolean;
  favourite: boolean;
  packageName: string;
  qtyInPackage: number;
}
