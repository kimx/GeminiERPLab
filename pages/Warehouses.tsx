
import React, { useState } from 'react';
import { WarehouseLocation } from '../types';

interface WarehousesProps {
  locations: WarehouseLocation[];
  setLocations: (l: WarehouseLocation[]) => void;
}

const Warehouses: React.FC<WarehousesProps> = ({ locations, setLocations }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<WarehouseLocation>>({ type: 'MAIN' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newWH: WarehouseLocation = {
      id: `WH-${Math.floor(Math.random() * 1000)}`,
      name: formData.name || '',
      location: formData.location || '',
      manager: formData.manager || '',
      type: (formData.type as any) || 'MAIN'
    };
    setLocations([...locations, newWH]);
    setIsAdding(false);
    setFormData({ type: 'MAIN' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">倉庫位置維護</h3>
        <button onClick={() => setIsAdding(!isAdding)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-lg">
          {isAdding ? '取消' : '＋ 新增倉庫'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm grid grid-cols-2 gap-4 animate-fadeIn">
          <input required placeholder="倉庫名稱" className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={e => setFormData({...formData, name: e.target.value})} />
          <input placeholder="地理位置" className="px-3 py-2 border rounded-lg" onChange={e => setFormData({...formData, location: e.target.value})} />
          <input placeholder="現場負責人" className="px-3 py-2 border rounded-lg" onChange={e => setFormData({...formData, manager: e.target.value})} />
          <select className="px-3 py-2 border rounded-lg" onChange={e => setFormData({...formData, type: e.target.value as any})}>
            <option value="MAIN">主要倉庫</option>
            <option value="COLD">冷鏈倉</option>
            <option value="BUFFER">緩衝倉</option>
          </select>
          <button type="submit" className="col-span-2 bg-emerald-600 text-white py-2 rounded-lg font-bold">啟用新倉儲點</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map(loc => (
          <div key={loc.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl">🏠</span>
              <span className={`px-2 py-1 text-[10px] font-bold rounded ${
                loc.type === 'MAIN' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {loc.type === 'MAIN' ? '主要營運倉' : '物流中轉'}
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-800">{loc.name}</h4>
            <div className="mt-4 space-y-1 text-sm text-slate-500">
              <p>📍 {loc.location}</p>
              <p>👤 負責人: {loc.manager}</p>
              <p className="font-mono text-xs mt-4 text-slate-300">ID: {loc.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Warehouses;
