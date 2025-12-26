
import React, { useState } from 'react';
import { Customer } from '../types';

interface CustomersProps {
  customers: Customer[];
  setCustomers: (c: Customer[]) => void;
}

const Customers: React.FC<CustomersProps> = ({ customers, setCustomers }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Customer>>({});

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newCust: Customer = {
      id: `CUST-${Math.floor(Math.random() * 1000)}`,
      name: formData.name || '',
      contact: formData.contact || '',
      phone: formData.phone || '',
      email: formData.email || '',
      address: formData.address || ''
    };
    setCustomers([...customers, newCust]);
    setIsAdding(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">客戶維護</h3>
        <button onClick={() => setIsAdding(!isAdding)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg">
          {isAdding ? '取消' : '＋ 新增客戶'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm grid grid-cols-2 gap-4 animate-fadeIn">
          <input required placeholder="客戶名稱 / 企業全稱" className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" onChange={e => setFormData({...formData, name: e.target.value})} />
          <input placeholder="聯絡窗口" className="px-3 py-2 border rounded-lg" onChange={e => setFormData({...formData, contact: e.target.value})} />
          <input placeholder="聯繫電話" className="px-3 py-2 border rounded-lg" onChange={e => setFormData({...formData, phone: e.target.value})} />
          <input placeholder="電子郵件" className="px-3 py-2 border rounded-lg" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input placeholder="收貨地址" className="px-3 py-2 border rounded-lg col-span-2" onChange={e => setFormData({...formData, address: e.target.value})} />
          <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded-lg font-bold">建立客戶檔</button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">客戶名稱</th>
              <th className="px-6 py-4">聯絡窗口</th>
              <th className="px-6 py-4">電話</th>
              <th className="px-6 py-4">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-slate-400">{c.id}</td>
                <td className="px-6 py-4 font-bold text-slate-800">{c.name}</td>
                <td className="px-6 py-4">{c.contact}</td>
                <td className="px-6 py-4">{c.phone}</td>
                <td className="px-6 py-4 text-slate-500">{c.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
