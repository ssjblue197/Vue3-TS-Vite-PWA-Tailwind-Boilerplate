import http from './http';

export function fetchAll() {
  return http.get(`permissions`);
}
