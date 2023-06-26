import http from './http';
import { objectToQueryString } from '@/utils/helper';

export interface RequestParams {
  employee?: string;
  limit?: number;
  page?: number;
  type?: string;
  location?: string;
}

export function getList(params: RequestParams) {
  return http.get(`internal-request?${objectToQueryString(params)}`);
}

