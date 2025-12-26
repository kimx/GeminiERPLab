
import React from 'react';
import { Product, Order, Transaction } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

interface DashboardProps {
  products: Product[];
  orders: Order[];
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ products, orders, transactions }) => {
  const totalRevenue = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, t) => acc + t.amount, 0);

  const inventoryValue = products.reduce((acc, p) => acc + (p.quantity * p.price), 0);
  
  const stats = [
    { label: '總營收', value: `$${totalRevenue.toLocaleString()}`, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '總支出', value: `$${totalExpense.toLocaleString()}`, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: '庫存資產價值', value: `$${inventoryValue.toLocaleString()}`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '待處理訂單', value: orders.filter(o => o.status === 'PENDING').length, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  // Dummy monthly data
  const chartData = [
    { name: '1月', 營收: 4000, 支出: 2400 },
    { name: '2月', 營收: 3000, 支出: 1398 },
    { name: '3月', 營收: 2000, 支出: 9800 },
    { name: '4月', 營收: 2780, 支出: 3908 },
    { name: '5月', 營收: 1890, 支出: 4800 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.bg} p-6 rounded-2xl border border-slate-100 shadow-sm transition-transform hover:scale-105 duration-300`}>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-slate-700">收支趨勢圖</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="營收" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="支出" stroke="#f43f5e" fillOpacity={0.3} fill="#f43f5e" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-slate-700">庫存類別分佈</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={products.map(p => ({ name: p.name, 庫存: p.quantity }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="庫存" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
