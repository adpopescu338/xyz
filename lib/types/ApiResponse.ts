export type APIResponse<Data = unknown> =
  | APISuccessResponse<Data>
  | APIFailResponse;

export type APISuccessResponse<D = unknown> = {
  success: true;
  data: D;
};

export type APIFailResponse = {
  success: false;
  error: string;
};
