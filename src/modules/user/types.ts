import type { Role } from '@/modules/role/types';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  is_active: boolean;
  username: string;
  roles: Role[];
  is_superadmin: boolean;
}
