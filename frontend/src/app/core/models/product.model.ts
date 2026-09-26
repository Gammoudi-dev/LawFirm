export interface Product {
  id: number;
  reference: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}


export interface ProductRequest {
  reference: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  status: 'ACTIVE' | 'INACTIVE';
}