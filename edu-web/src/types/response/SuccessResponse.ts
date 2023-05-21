export type SuccessResponse<T> = {
  result: T;
  paging?: PagingType;
};

export type PagingType = {
  page: number;
  perPage: number;
  total: number;
};
