import http from './http';
import type { PagingParams } from '@/types/api';
import type { Role } from '@/modules/role/types';
export interface FetchAllParams extends PagingParams {
  is_active?: number[];
  created_at_begin?: string;
  created_at_end?: string;
  keyword?: string;
  role_id?: number;
}

export interface ChangePasswordParams {
  new_password: string;
  new_password_confirmation: string;
}

export interface UserParams {
  first_name: string;
  last_name: string;
  username: string;
  role: Role;
  is_active: boolean;
  password?: string;
  password_confirmation?: string;
}

export function fetchAll(params: FetchAllParams) {
  return http.get(`users`, { params });
}

export function changePassword(id: number, params: ChangePasswordParams) {
  return http.put(`users/${id}/password`, params);
}

export function remove(id: number) {
  return http.delete(`users/${id}`);
}

export function create(params: UserParams) {
  return http.post(`users`, { ...params, role_id: params.role?.id });
}

export function update(id: number, params: UserParams) {
  return http.put(`users/${id}`, {
    ...params,
    role_id: params.role?.id,
  });
}
