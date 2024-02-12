import { StoreType, StoreTypeWithData } from "#core/effector/types/store";

export class XHRDataState<D> implements StoreTypeWithData<D> {
  loading: boolean;
  data: D;
  error: undefined;

  constructor(data: D) {
    this.loading = false;
    this.data = data;
    this.error = undefined;
  }
}

export class XHRSuccessState implements StoreType {
  loading: boolean;
  success: boolean;
  error: undefined;

  constructor(success = false) {
    this.loading = false;
    this.success = success;
    this.error = undefined;
  }
}
