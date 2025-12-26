
import React, { useState } from 'react';
import { PurchaseOrder, Product, Supplier } from '../types';

interface ProcurementProps {
  purchaseOrders: PurchaseOrder[];
  products: Product[];
  suppliers: Supplier[];
  createPO: (po: PurchaseOrder) => void;
}

const Procurement: React.FC<ProcurementProps> = ({ purchaseOrders, products, suppliers, createPO }) => {
  const [showForm, setShowForm] = useState(false);
  const [newPO, setNewPO] = useState<Partial<PurchaseOrder>>({
    productId: products[0]?.id || '',
    supplierId: suppliers[0]?.id || '',
    quantity: 1,
    unitPrice: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const po: PurchaseOrder = {
      id: `PO-${Math.floor(1000 + Math.random() * 9000)}`,
      supplierId: newPO.supplierId || '',
      productId: newPO.productId || '',
      quantity: Number(newPO.quantity) || 1,
      unitPrice: Number(newPO.unitPrice) || 0,
      date: new Date().toISOString().split('T')[0],
      status: 'DRAFT'
    };
    createPO(po);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">採購單管理</h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100"
        >
          {showForm ? '取消新增' : '建立新採購單 +'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm grid grid-cols-2 gap-4 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">供應商選擇</label>
            <select 
              required
              className="px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={newPO.supplierId} 
              onChange={e => setNewPO({...newPO, supplierId: e.target.value})} 
            >
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">產品品項</label>
            <select 
              className="px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={newPO.productId}
              onChange={e => setNewPO({...newPO, productId: e.target.value})}
            >
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">採購數量</label>
            <input 
              type="number" 
              className="px-3 py-2 border border-slate-200 rounded-lg"
              value={newPO.quantity} 
              onChange={e => setNewPO({...newPO, quantity: parseInt(e.target.value)})}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">預計單價</label>
            <input 
              type="number" 
              className="px-3 py-2 border border-slate-200 rounded-lg"
              value={newPO.unitPrice} 
              onChange={e => setNewPO({...newPO, unitPrice: parseInt(e.target.value)})}
            />
          </div>
          <button type="submit" className="col-span-2 mt-2 bg-indigo-600 text-white py-3 rounded-xl font-bold">送出採購申請</button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">編號</th>
              <th className="px-6 py-4">供應商</th>
              <th className="px-6 py-4">品項</th>
              <th className="px-6 py-4 text-center">數量</th>
              <th className="px-6 py-4 text-right">預算總額</th>
              <th className="px-6 py-4 text-center">狀態</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {purchaseOrders.map((po) => (
              <tr key={po.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono font-medium text-slate-900">{po.id}</td>
                <td className="px-6 py-4 text-slate-700">{suppliers.find(s => s.id === po.supplierId)?.name || po.supplierId}</td>
                <td className="px-6 py-4 text-slate-600">{products.find(p => p.id === po.productId)?.name}</td>
                <td className="px-6 py-4 text-center">{po.quantity}</td>
                <td className="px-6 py-4 text-right font-semibold">${(po.quantity * po.unitPrice).toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    po.status === 'RECEIVED' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {po.status === 'RECEIVED' ? '已收貨' : '待處理'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Procurement;
