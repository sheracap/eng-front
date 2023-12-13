export type CategoriesParamsType = {
  companyId?: string;
  branchId?: string;
  status?: string;
};

export type CategoriesAuxiliariesParamsTypes = {
  branchName?: string;
};

export interface CategoryItemModel {
  id: number;
  name: string;
  children: Array<CategoryItemModel>;
  parentId: number | null;
  productCount: number;
  status: {
    code: string;
    name: string;
  };
}

export type CategoriesTreeModel = Array<CategoryItemModel>;

export type CategoryStatusChangeModel = {
  id: number;
  status: string;
};
