import http from './http';

export interface AuthParams {
  username: string;
  password: string;
}

export function login(params: AuthParams) {
  return http.post(`auth`, params);
}

export function me() {
  return http.get(`me`);
}
