
import React, { useState } from 'react';
import Layout from './components/Layout';
import { View, Product, Order, Transaction, PurchaseOrder, Invoice, Supplier, Customer, WarehouseLocation } from './types';
import { 
  INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_TRANSACTIONS, 
  INITIAL_PURCHASE_ORDERS, INITIAL_INVOICES, INITIAL_SUPPLIERS,
  INITIAL_CUSTOMERS, INITIAL_WAREHOUSES
} from './constants';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Finance from './pages/Finance';
import AIInsights from './pages/AIInsights';
import Procurement from './pages/Procurement';
import Warehouse from './pages/Warehouse';
import Suppliers from './pages/Suppliers';
import Customers from './pages/Customers';
import Warehouses from './pages/Warehouses';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.DASHBOARD);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(INITIAL_PURCHASE_ORDERS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  
  // Master Data States
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [warehouseLocs, setWarehouseLocs] = useState<WarehouseLocation[]>(INITIAL_WAREHOUSES);

  const createPO = (po: PurchaseOrder) => setPurchaseOrders([...purchaseOrders, po]);
  const createSO = (so: Order) => setOrders([...orders, so]);

  const handleInbound = (poId: string) => {
    const po = purchaseOrders.find(p => p.id === poId);
    if (!po || po.status === 'RECEIVED') return;
    setProducts(prev => prev.map(p => p.id === po.productId ? { ...p, quantity: p.quantity + po.quantity } : p));
    setPurchaseOrders(prev => prev.map(p => p.id === poId ? { ...p, status: 'RECEIVED' } : p));
    setTransactions([...transactions, {
      id: `T-PO-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'EXPENSE',
      category: '採購進貨',
      amount: po.quantity * po.unitPrice,
      description: `採購單 ${poId} 入庫支出`
    }]);
  };

  const handleOutbound = (orderId: string, carrier: string, trackingNo: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || order.status !== 'PENDING') return;
    const product = products.find(p => p.id === order.productId);
    
    if (!product || product.quantity < order.quantity) {
      alert(`庫存不足！目前庫存: ${product?.quantity || 0}，需求: ${order.quantity}`);
      return;
    }

    // Update Inventory
    setProducts(prev => prev.map(p => p.id === order.productId ? { ...p, quantity: p.quantity - order.quantity } : p));
    
    // Update Order with Logistics
    setOrders(prev => prev.map(o => o.id === orderId ? { 
      ...o, 
      status: 'SHIPPED',
      logistics: {
        carrier,
        trackingNo,
        shippedAt: new Date().toLocaleString()
      }
    } : o));

    // Create Invoice
    setInvoices([...invoices, {
      id: `INV-${Date.now()}`,
      orderId: orderId,
      customerName: customers.find(c => c.id === order.customerId)?.name || '未知客戶',
      amount: order.total,
      date: new Date().toISOString().split('T')[0],
      tax: order.total * 0.05
    }]);

    // Record Transaction
    setTransactions([...transactions, {
      id: `T-SO-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'INCOME',
      category: '銷售收入',
      amount: order.total,
      description: `訂單 ${orderId} 出貨收入`
    }]);
  };

  const renderContent = () => {
    switch (view) {
      case View.DASHBOARD: return <Dashboard products={products} orders={orders} transactions={transactions} />;
      case View.PROCUREMENT: return <Procurement purchaseOrders={purchaseOrders} products={products} suppliers={suppliers} createPO={createPO} />;
      case View.WAREHOUSE: return <Warehouse purchaseOrders={purchaseOrders} orders={orders} handleInbound={handleInbound} handleOutbound={handleOutbound} products={products} customers={customers} />;
      case View.SALES: return <Sales orders={orders} products={products} customers={customers} createSO={createSO} />;
      case View.FINANCE: return <Finance transactions={transactions} invoices={invoices} />;
      case View.SUPPLIERS: return <Suppliers suppliers={suppliers} setSuppliers={setSuppliers} />;
      case View.CUSTOMERS: return <Customers customers={customers} setCustomers={setCustomers} />;
      case View.WAREHOUSES: return <Warehouses locations={warehouseLocs} setLocations={setWarehouseLocs} />;
      case View.INVENTORY: return <Inventory products={products} setProducts={setProducts} />;
      case View.AI_INSIGHTS: return <AIInsights products={products} orders={orders} transactions={transactions} />;
      default: return <Dashboard products={products} orders={orders} transactions={transactions} />;
    }
  };

  return (
    <Layout currentView={view} setView={setView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
