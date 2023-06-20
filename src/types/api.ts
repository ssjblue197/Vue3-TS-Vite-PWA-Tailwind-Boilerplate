interface FilterParams {
  [key: string]: string | string[];
}

interface SortParams {
  [key: string]: string;
}
export interface PagingParams {
  limit?: number;
  page?: number;
}

interface QueryParams {
  paging: PagingParams;
  filters: FilterParams;
  sorter: SortParams;
  action?: string;
}
export interface ResponseListData<T> {
  data: T[];
  total: number;
}

export interface GetParams extends QueryParams, Record<string, unknown> {}
export type PostParams<T = undefined> = T;
