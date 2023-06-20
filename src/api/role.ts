import type { PagingParams } from '@/types/api';
import http from './http';

export interface FetchAllParams extends PagingParams {
  created_at_begin?: string;
  created_at_end?: string;
  name?: string;
}

export interface RoleParams {
  name: string;
  permission_name?: string[];
}

export function fetchAll(params: FetchAllParams) {
  return http.get(`roles`, { params });
}

export function remove(id: number) {
  return http.delete(`roles/${id}`);
}

export function details(id: number) {
  return http.get(`roles/${id}`);
}

export function create(params: RoleParams) {
  return http.post(`roles`, params);
}

export function update(id: number, params: RoleParams) {
  return http.put(`roles/${id}`, params);
}
