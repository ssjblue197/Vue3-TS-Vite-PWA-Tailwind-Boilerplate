import http from './http';
import { objectToQueryString } from '@/utils/helper';

export interface AuthParams {
  code: string;
  token: string;
}

export function login(params: AuthParams) {
  return http.get(`internal-request/login?${objectToQueryString(params)}`);
}
