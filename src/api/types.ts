export interface RequestParams {
  employee?: number;
  location?: string;
  device?: string
}

export interface ReceivePayload {
  employee_id?: number;
  request_id?: number;
  location?: string;
}

export interface FulFillRequestPayload {
  employee_id?: number;
  barcode?: string;
  id_time_checking?: number;
  request_id?: number;
}

export interface ParamsGetMissingBox {
  employee_id?: string;
  internal_request_id?: string;
  location_id?: string;
  product_id?: string;
}