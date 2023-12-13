import { SortOrder } from "antd/lib/table/interface";

export const checkSortOrder = (
  fieldName: string,
  orderBy: string | undefined,
  sortOrder: string | undefined,
): SortOrder => {
  return orderBy === fieldName ? (sortOrder === "asc" ? "ascend" : "descend") : null;
};

export const getSortOrderParams = (sorter) => ({
  orderBy: sorter.order ? sorter.field : undefined,
  sortOrder: sorter.order ? (sorter.order === "ascend" ? "asc" : "desc") : undefined,
});
