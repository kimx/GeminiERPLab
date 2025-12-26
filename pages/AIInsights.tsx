
import React, { useState } from 'react';
import { Product, Order, Transaction } from '../types';
import { getBusinessInsights } from '../services/geminiService';

interface AIInsightsProps {
  products: Product[];
  orders: Order[];
  transactions: Transaction[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ products, orders, transactions }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    
    // Create a context string for Gemini
    const context = `
    目前庫存品項: ${products.map(p => `${p.name}(${p.quantity})`).join(', ')}
    最近訂單數量: ${orders.length}
    最近一週交易總額: $${transactions.reduce((acc, t) => acc + t.amount, 0)}
    待處理訂單: ${orders.filter(o => o.status === 'PENDING').length}
    `;

    const result = await getBusinessInsights(context);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="text-8xl">✨</span>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Gemini AI 智能業務顧問</h2>
          <p className="text-slate-500 mb-8">
            我們的 AI 將分析您的實時 ERP 數據，提供關於庫存優化、銷售預測和財務健康的深度洞察。
          </p>

          {!insight && !loading && (
            <div className="text-center py-12">
              <button
                onClick={generateInsights}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all transform hover:-translate-y-1"
              >
                🚀 開始分析數據
              </button>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium animate-pulse">正在深度解析您的業務數據...</p>
            </div>
          )}

          {insight && !loading && (
            <div className="animate-fadeIn">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 whitespace-pre-wrap text-slate-700 leading-relaxed">
                {insight}
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={generateInsights}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-4"
                >
                  重新生成洞察
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h4 className="font-bold text-blue-800 mb-2">💡 分析提示</h4>
          <p className="text-sm text-blue-700 leading-relaxed">
            AI 顾问會檢查庫存周轉率、訂單完成時間以及營收趨勢，幫助您識別隱藏的風險與機遇。
          </p>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
          <h4 className="font-bold text-amber-800 mb-2">⚠️ 風險警告</h4>
          <p className="text-sm text-amber-700 leading-relaxed">
            目前的「Ergonomic Chair」庫存接近臨界點（30件），AI 可能會建議您聯繫供應商進行補貨。
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
