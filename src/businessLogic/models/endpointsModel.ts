export type EndpointsParamsType = {
  id?: string;
  type?: string;
};

export type EndpointsItemModel = {
  id: string;
  name: string;
  code: string;
  position?: any;
  section: boolean;
  parentId?: string;
  permissionType: string;
  children: EndpointsItemModelList[];
};
export type EndpointsItemModelList = Array<EndpointsItemModel>;

export type EndpointUpdateModel = {
  id: string;
  name: string;
  code: string;
  permissionType: string;
};
export type EndpointCreateModel = {
  name: string;
  code: string;
  permissionType: string;
  parentId: string | undefined;
  section: boolean;
};
