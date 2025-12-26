
export enum View {
  DASHBOARD = 'DASHBOARD',
  PROCUREMENT = 'PROCUREMENT',
  INVENTORY = 'INVENTORY',
  WAREHOUSE = 'WAREHOUSE',
  SALES = 'SALES',
  FINANCE = 'FINANCE',
  AI_INSIGHTS = 'AI_INSIGHTS',
  SUPPLIERS = 'SUPPLIERS',
  CUSTOMERS = 'CUSTOMERS',
  WAREHOUSES = 'WAREHOUSES'
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

export interface WarehouseLocation {
  id: string;
  name: string;
  location: string;
  manager: string;
  type: 'MAIN' | 'COLD' | 'BUFFER';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  date: string;
  status: 'DRAFT' | 'RECEIVED';
}

export interface Order {
  id: string;
  customerId: string;
  productId: string;
  quantity: number;
  date: string;
  total: number;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED';
  logistics?: {
    carrier: string;
    trackingNo: string;
    shippedAt?: string;
  };
}

export interface Invoice {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  date: string;
  tax: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  description: string;
}

export interface InsightMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
