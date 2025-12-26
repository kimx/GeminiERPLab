
import React, { useState } from 'react';
import { Supplier } from '../types';

interface SuppliersProps {
  suppliers: Supplier[];
  setSuppliers: (s: Supplier[]) => void;
}

const Suppliers: React.FC<SuppliersProps> = ({ suppliers, setSuppliers }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Supplier>>({});

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newSup: Supplier = {
      id: `SUP-${Math.floor(Math.random() * 1000)}`,
      name: formData.name || '',
      contact: formData.contact || '',
      phone: formData.phone || '',
      email: formData.email || '',
      address: formData.address || ''
    };
    setSuppliers([...suppliers, newSup]);
    setIsAdding(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">供應商目錄</h3>
        <button onClick={() => setIsAdding(!isAdding)} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-lg">
          {isAdding ? '取消' : '＋ 新增供應商'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 gap-4 animate-fadeIn">
          <input required placeholder="供應商全稱" className="px-3 py-2 border rounded-lg" onChange={e => setFormData({...formData, name: e.target.value})} />
          <input placeholder="聯絡人" className="px-3 py-2 border rounded-lg" onChange={e => setFormData({...formData, contact: e.target.value})} />
          <input placeholder="電話" className="px-3 py-2 border rounded-lg" onChange={e => setFormData({...formData, phone: e.target.value})} />
          <input placeholder="Email" className="px-3 py-2 border rounded-lg" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input placeholder="地址" className="px-3 py-2 border rounded-lg col-span-2" onChange={e => setFormData({...formData, address: e.target.value})} />
          <button type="submit" className="col-span-2 bg-indigo-600 text-white py-2 rounded-lg font-bold">存檔</button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">供應商名稱</th>
              <th className="px-6 py-4">聯絡人</th>
              <th className="px-6 py-4">聯繫電話</th>
              <th className="px-6 py-4">地址</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {suppliers.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-slate-400">{s.id}</td>
                <td className="px-6 py-4 font-bold text-slate-800">{s.name}</td>
                <td className="px-6 py-4">{s.contact}</td>
                <td className="px-6 py-4">{s.phone}</td>
                <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{s.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suppliers;
