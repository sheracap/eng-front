export class PaginationListOld {
  content: any[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  last: boolean;
  totalElements: number;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;

  constructor() {
    this.content = [];
    this.pageable = {
      sort: {
        sorted: false,
        unsorted: false,
        empty: false,
      },
      pageSize: 0,
      pageNumber: 0,
      offset: 0,
      unpaged: false,
      paged: false,
    };
    this.totalPages = 0;
    this.last = false;
    this.totalElements = 0;
    this.first = false;
    this.sort = {
      sorted: false,
      unsorted: false,
      empty: false,
    };
    this.numberOfElements = 0;
    this.size = 0;
    this.number = 0;
    this.empty = false;
  }
}

export class PaginationList {
  rows: any[];
  count: number;

  constructor() {
    this.rows = [];
    this.count = 0;
  }
}
