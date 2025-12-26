
import React, { useState } from 'react';
import { Order, Product, Customer } from '../types';

interface SalesProps {
  orders: Order[];
  products: Product[];
  customers: Customer[];
  createSO: (so: Order) => void;
}

const Sales: React.FC<SalesProps> = ({ orders, products, customers, createSO }) => {
  const [showForm, setShowForm] = useState(false);
  const [newSO, setNewSO] = useState<Partial<Order>>({
    customerId: customers[0]?.id || '',
    productId: products[0]?.id || '',
    quantity: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find(p => p.id === newSO.productId);
    if (!product) return;

    const so: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: newSO.customerId || '',
      productId: newSO.productId || '',
      quantity: Number(newSO.quantity) || 1,
      date: new Date().toISOString().split('T')[0],
      total: (product.price * (Number(newSO.quantity) || 1)),
      status: 'PENDING'
    };
    createSO(so);
    setShowForm(false);
  };

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-700';
      case 'SHIPPED': return 'bg-blue-100 text-blue-700';
      case 'DELIVERED': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">銷售訂單管理</h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
        >
          {showForm ? '取消新增' : '建立新訂單 +'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm grid grid-cols-2 gap-4 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">客戶選擇</label>
            <select 
              required
              className="px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={newSO.customerId} 
              onChange={e => setNewSO({...newSO, customerId: e.target.value})} 
            >
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">購買品項</label>
            <select 
              className="px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={newSO.productId}
              onChange={e => setNewSO({...newSO, productId: e.target.value})}
            >
              {products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price.toLocaleString()})</option>)}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">購買數量</label>
            <input 
              type="number" 
              className="px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={newSO.quantity} 
              onChange={e => setNewSO({...newSO, quantity: parseInt(e.target.value)})}
            />
          </div>
          <div className="flex flex-col justify-end">
             <div className="text-right p-2">
                <span className="text-slate-400 text-xs">預計金額: </span>
                <span className="text-xl font-bold text-slate-800">
                    ${( (products.find(p => p.id === newSO.productId)?.price || 0) * (Number(newSO.quantity) || 0) ).toLocaleString()}
                </span>
             </div>
          </div>
          <button type="submit" className="col-span-2 mt-2 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
            確認建立銷售訂單
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">訂單資訊</th>
              <th className="px-6 py-4">客戶 / 品項</th>
              <th className="px-6 py-4 text-right">金額</th>
              <th className="px-6 py-4 text-center">狀態</th>
              <th className="px-6 py-4">物流追蹤</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                    <p className="font-mono font-medium text-slate-900">{o.id}</p>
                    <p className="text-[10px] text-slate-400">{o.date}</p>
                </td>
                <td className="px-6 py-4">
                    <p className="font-bold text-slate-700">{customers.find(c => c.id === o.customerId)?.name || o.customerId}</p>
                    <p className="text-xs text-slate-500">{products.find(p => p.id === o.productId)?.name} x {o.quantity}</p>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-slate-900">${o.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${getStatusStyle(o.status)}`}>
                    {o.status === 'PENDING' ? '待出貨' : o.status === 'SHIPPED' ? '已發貨' : '已送達'}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs">
                    {o.logistics ? (
                        <div className="space-y-1">
                            <p className="font-bold text-blue-600">{o.logistics.carrier}</p>
                            <p className="text-[10px] font-mono bg-blue-50 px-1 py-0.5 rounded inline-block">{o.logistics.trackingNo}</p>
                        </div>
                    ) : (
                        <span className="text-slate-300 italic">尚未發貨</span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
