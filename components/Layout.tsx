
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  currentView: View;
  setView: (view: View) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const businessFlow = [
    { id: View.DASHBOARD, label: '控制台', icon: '📊' },
    { id: View.PROCUREMENT, label: '採購管理', icon: '🛒' },
    { id: View.WAREHOUSE, label: '倉儲作業', icon: '🏗️' },
    { id: View.SALES, label: '銷售作業', icon: '💰' },
    { id: View.FINANCE, label: '財務發票', icon: '📈' },
  ];

  const masterData = [
    { id: View.SUPPLIERS, label: '供應商維護', icon: '🏢' },
    { id: View.CUSTOMERS, label: '客戶維護', icon: '👥' },
    { id: View.WAREHOUSES, label: '倉庫維護', icon: '🏠' },
    { id: View.INVENTORY, label: '產品目錄', icon: '📦' },
  ];

  const aiModule = [
    { id: View.AI_INSIGHTS, label: 'AI 業務洞察', icon: '✨' },
  ];

  const renderNavGroup = (items: typeof businessFlow, title: string) => (
    <div className="mb-6">
      <h3 className="px-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">{title}</h3>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 ${
            currentView === item.id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <span className="mr-3 text-lg">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );

  const allItems = [...businessFlow, ...masterData, ...aiModule];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl flex-shrink-0">
        <div className="p-6 mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Gemini ERP
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 font-bold">V2.0 ENTERPRISE</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          {renderNavGroup(businessFlow, "營運流程")}
          {renderNavGroup(masterData, "基礎資料")}
          {renderNavGroup(aiModule, "智慧分析")}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold">A</div>
            <div>
              <p className="text-xs font-semibold">系統管理員</p>
              <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">ONLINE</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm flex-shrink-0">
          <div className="flex items-center space-x-2">
             <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                {allItems.find(i => i.id === currentView)?.icon}
             </div>
             <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                {allItems.find(i => i.id === currentView)?.label}
             </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              🔔
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Server Region</p>
              <p className="text-xs text-slate-600 font-semibold">Asia East 1</p>
            </div>
          </div>
        </header>
        <div className="p-8 overflow-y-auto flex-1 bg-slate-50/50">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
