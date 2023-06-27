import http from './http';
import { objectToQueryString } from '@/utils/helper';
import type {
  RequestParams,
  ReceivePayload,
} from './types';

export function getList(params: RequestParams) {
  return http.get(`internal-request?${objectToQueryString(params)}`);
}

export function receiveRequest(payload: ReceivePayload) {
  const data = {
    employee_id: payload.employee_id
  }
  return http.put(`internal-request/receive-request/${payload.request_id}`, data);
}

export function getCurrentPickingUp(payload: ReceivePayload) {
  return http.get(`internal-request/picking-up/${payload.employee_id}`);
}


