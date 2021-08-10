export class FilterPaginationModel {
  pageNumber?: number;
  pageSize?: number;
  orderByfield?: string;
  orderByType?: string;

  constructor(options: FilterPaginationModel = {}){
    this.pageNumber = options.pageNumber || null;
    this.pageSize = options.pageSize || null;
    this.orderByfield = options.orderByfield || null;
    this.orderByType = options.orderByType || null;
  }
}
