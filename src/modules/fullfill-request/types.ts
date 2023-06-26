export interface Product {
  id: number,
  name: string,
  style: string,
  sku: string,
  color: string,
  size: string,
  created_at: string,
  updated_at: string,
  is_default: number,
  status: string,
}

export interface Employee {
  id: number,
  name: string,
  warehouse_id: number,
  department: string,
  code: string,
  is_leader: number,
  token_fcm: string
}

export interface Request {
  id: number,
  warehouse_id: number,
  product_id: number,
  employee_create_id: number,
  employee_receive_id: number,
  employee_fulfill_id: number,
  box_id: number,
  priority: number,
  status: string,
  updated_at: string,
  locations: Array<string>,
  stock_level: string,
  id_pad: string,
  product: Product,
  box: any,
  employee_create: Employee,
  employee_receive: Employee,
  employee_fulfill: Employee,
  created_at?: string;
  received_at?: string,
  fulfilled_at?: string,
}