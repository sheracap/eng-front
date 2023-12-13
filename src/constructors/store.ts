export class XHRDataState {
  loading;
  data;
  error;
  constructor(data) {
    this.loading = false;
    this.data = data;
    this.error = undefined;
  }
}

export class XHRSuccessState {
  loading;
  success;
  error;
  constructor(success = false) {
    this.loading = false;
    this.success = success;
    this.error = undefined;
  }
}
