import http from './http';
import { objectToQueryString } from '@/utils/helper';
import type {
  ParamsGetMissingBox,
  FulFillRequestPayload,
  ReceivePayload,
} from './types';


export function getCurrentPickingUp(payload: ReceivePayload) {
  return http.get(`internal-request/picking-up/${payload.employee_id}`);
}

export function cancelPickup(payload: ReceivePayload) {
  const dataSend = {
    employee_id: payload.employee_id
  }
  return http.put(`internal-request/release-request/${payload.request_id}`, dataSend);
}

export function fulfillRequest(payload: FulFillRequestPayload) {
  const dataSend = {
    employee_id: payload.employee_id,
    barcode: payload.barcode,
    id_time_checking: payload.id_time_checking
  }
  return http.put(`internal-request/${payload.request_id}`, dataSend);
}

export function getAllMissingBox(payload: ParamsGetMissingBox) {
  return http.get(`internal-request/all-box-missing?${objectToQueryString(payload)}`);
}

export function reportMissingBox(payload: ParamsGetMissingBox) {
  return http.post(`internal-request/missing-box`, payload);
}


