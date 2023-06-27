import http from './http';
// import { objectToQueryString } from '@/utils/helper';
import type {
  // RequestParams,
  ReceivePayload,
} from './types';


export function getCurrentPickingUp(payload: ReceivePayload) {
  return http.get(`internal-request/picking-up/${payload.employee_id}`);
}


