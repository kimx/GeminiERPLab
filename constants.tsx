
import { Product, Order, Transaction, PurchaseOrder, Invoice, Supplier, Customer, WarehouseLocation } from './types';

export const INITIAL_SUPPLIERS: Supplier[] = [
  { id: 'SUP-001', name: '智聯電子供應鏈', contact: '張經理', phone: '02-2345-6789', email: 'sales@smartlink.com', address: '台北市內湖區瑞光路100號' },
  { id: 'SUP-002', name: '宏基精密工業', contact: '李小姐', phone: '03-567-8901', email: 'contact@acer-precision.tw', address: '新竹市科學園區研發路1號' }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'CUST-001', name: '王小明', contact: '王小明', phone: '0912-345-678', email: 'ming@gmail.com', address: '台中市西屯區台灣大道三段' },
  { id: 'CUST-002', name: '數位創新工作室', contact: '陳大文', phone: '02-8888-9999', email: 'info@digital-nova.io', address: '台北市大安區忠孝東路' }
];

export const INITIAL_WAREHOUSES: WarehouseLocation[] = [
  { id: 'WH-001', name: '台北總倉', location: '桃園市龜山區', manager: '老王', type: 'MAIN' },
  { id: 'WH-002', name: '南部物流中心', location: '高雄市前鎮區', manager: '阿水', type: 'BUFFER' }
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'MacBook Pro M3', category: '電子產品', quantity: 45, price: 59900, description: '高性能筆記型電腦' },
  { id: '2', name: 'iPhone 15 Pro', category: '電子產品', quantity: 120, price: 36900, description: '旗艦智慧型手機' },
  { id: '3', name: 'Ergonomic Chair', category: '家具', quantity: 30, price: 8500, description: '符合人體工學的辦公椅' },
  { id: '4', name: 'Mechanical Keyboard', category: '配件', quantity: 85, price: 3200, description: '頂級機械鍵盤' }
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: 'PO-001', supplierId: 'SUP-001', productId: '1', quantity: 10, unitPrice: 50000, date: '2024-05-01', status: 'RECEIVED' }
];

export const INITIAL_ORDERS: Order[] = [
  { id: 'ORD-001', customerId: 'CUST-001', productId: '1', quantity: 1, date: '2024-05-10', total: 59900, status: 'DELIVERED' }
];

export const INITIAL_INVOICES: Invoice[] = [
  { id: 'INV-2024-001', orderId: 'ORD-001', customerName: '王小明', amount: 59900, date: '2024-05-10', tax: 2995 }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'T001', date: '2024-05-01', type: 'INCOME', category: '銷售', amount: 450000, description: '五月份第一週銷售收入' }
];
