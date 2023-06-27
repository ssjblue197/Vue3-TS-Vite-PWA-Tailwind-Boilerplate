export interface RequestParams {
  employee?: number;
  location?: string;
  device?: string
}

export interface ReceivePayload {
  employee_id?: number;
  request_id?: number;
}