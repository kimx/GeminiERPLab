
import React, { useState } from 'react';
import { Product } from '../types';
import { generateInventoryDescription } from '../services/geminiService';

interface InventoryProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const Inventory: React.FC<InventoryProps> = ({ products, setProducts }) => {
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const handleGenerateDescription = async (id: string, name: string, category: string) => {
    setGeneratingId(id);
    const newDesc = await generateInventoryDescription(name, category);
    setProducts(products.map(p => p.id === id ? { ...p, description: newDesc } : p));
    setGeneratingId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">現有庫存列表</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          新增品項 +
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">產品名稱</th>
              <th className="px-6 py-4">分類</th>
              <th className="px-6 py-4 text-center">數量</th>
              <th className="px-6 py-4 text-right">單價</th>
              <th className="px-6 py-4">產品描述</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 text-xs">
                    {p.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`${p.quantity < 50 ? 'text-rose-500 font-bold' : 'text-slate-600'}`}>
                    {p.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">${p.price.toLocaleString()}</td>
                <td className="px-6 py-4 max-w-xs truncate text-slate-500 italic">
                  {p.description || "暫無描述"}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleGenerateDescription(p.id, p.name, p.category)}
                    disabled={generatingId === p.id}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                  >
                    {generatingId === p.id ? '生成中...' : '🪄 AI 生成描述'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
