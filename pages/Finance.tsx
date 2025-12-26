
import React, { useState } from 'react';
import { Transaction, Invoice } from '../types';

interface FinanceProps {
  transactions: Transaction[];
  invoices: Invoice[];
}

const Finance: React.FC<FinanceProps> = ({ transactions, invoices }) => {
  const [tab, setTab] = useState<'ledger' | 'invoices'>('ledger');

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-slate-200">
        <button 
          onClick={() => setTab('ledger')}
          className={`pb-4 text-sm font-bold transition-all px-4 ${tab === 'ledger' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          日常收支總帳
        </button>
        <button 
          onClick={() => setTab('invoices')}
          className={`pb-4 text-sm font-bold transition-all px-4 ${tab === 'invoices' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          電子發票開立紀錄
        </button>
      </div>

      {tab === 'ledger' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">日期</th>
                  <th className="px-6 py-4">類別</th>
                  <th className="px-6 py-4">描述</th>
                  <th className="px-6 py-4 text-center">類型</th>
                  <th className="px-6 py-4 text-right">金額</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-500">{t.date}</td>
                    <td className="px-6 py-4">
                      <span className="text-slate-700 font-medium">{t.category}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 italic">{t.description}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        t.type === 'INCOME' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {t.type === 'INCOME' ? '收入' : '支出'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-mono font-bold ${
                      t.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {t.type === 'INCOME' ? '+' : '-'}${t.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">發票號碼</th>
                  <th className="px-6 py-4">關聯訂單</th>
                  <th className="px-6 py-4">客戶</th>
                  <th className="px-6 py-4 text-right">未稅金額</th>
                  <th className="px-6 py-4 text-right">稅額 (5%)</th>
                  <th className="px-6 py-4 text-right">總計</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-blue-600">{inv.id}</td>
                    <td className="px-6 py-4 text-slate-500">{inv.orderId}</td>
                    <td className="px-6 py-4 font-medium">{inv.customerName}</td>
                    <td className="px-6 py-4 text-right">${inv.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-slate-500">${inv.tax.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">${(inv.amount + inv.tax).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
          <p className="text-sm opacity-80 uppercase tracking-widest mb-2 font-semibold">當前淨利潤</p>
          <p className="text-3xl font-bold font-mono">
            ${(transactions.reduce((acc, t) => t.type === 'INCOME' ? acc + t.amount : acc - t.amount, 0)).toLocaleString()}
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
           <p className="text-sm text-slate-500 uppercase tracking-widest mb-2 font-semibold">累計應繳稅額</p>
           <p className="text-3xl font-bold text-rose-600 font-mono">
             ${invoices.reduce((acc, inv) => acc + inv.tax, 0).toLocaleString()}
           </p>
        </div>
      </div>
    </div>
  );
};

export default Finance;
