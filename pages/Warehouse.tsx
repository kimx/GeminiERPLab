
import React, { useState } from 'react';
import { PurchaseOrder, Order, Product, Customer } from '../types';

interface WarehouseProps {
  purchaseOrders: PurchaseOrder[];
  orders: Order[];
  handleInbound: (id: string) => void;
  handleOutbound: (id: string, carrier: string, trackingNo: string) => void;
  products: Product[];
  customers: Customer[];
}

const Warehouse: React.FC<WarehouseProps> = ({ purchaseOrders, orders, handleInbound, handleOutbound, products, customers }) => {
  const pendingPOs = purchaseOrders.filter(po => po.status === 'DRAFT');
  const pendingSOs = orders.filter(so => so.status === 'PENDING');
  
  // Local state for shipping details form
  const [shippingForm, setShippingForm] = useState<{orderId: string, carrier: string, trackingNo: string} | null>(null);

  const carriers = ['順豐速運', '黑貓宅急便', '新竹物流', '郵局包裹'];

  const initiateShipping = (orderId: string) => {
    setShippingForm({
      orderId,
      carrier: carriers[0],
      trackingNo: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`
    });
  };

  const confirmShipping = () => {
    if (shippingForm) {
      handleOutbound(shippingForm.orderId, shippingForm.carrier, shippingForm.trackingNo);
      setShippingForm(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inbound Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2">
                <span className="text-xl">📥</span>
                <h3 className="text-lg font-bold text-slate-800">入庫點收</h3>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">待點收: {pendingPOs.length}</span>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
          {pendingPOs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-slate-300">
              <span className="text-5xl mb-4 opacity-20">✅</span>
              <p className="font-medium">今日進貨任務已全數完成</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingPOs.map(po => (
                <div key={po.id} className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-center group">
                  <div>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">採購單: {po.id}</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">
                      {products.find(p => p.id === po.productId)?.name}
                    </p>
                    <p className="text-sm text-slate-500 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-slate-300 mr-2"></span>
                        應到數量: <span className="font-bold ml-1 text-slate-700">{po.quantity} 件</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => handleInbound(po.id)}
                    className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-200 hover:bg-emerald-600 transition-all active:scale-95"
                  >
                    點收確認
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Outbound Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2">
                <span className="text-xl">📤</span>
                <h3 className="text-lg font-bold text-slate-800">出貨作業</h3>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">待處理: {pendingSOs.length}</span>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px] relative">
          
          {/* Shipping Detail Modal-like Overlay */}
          {shippingForm && (
            <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm p-8 flex flex-col animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-bold text-slate-800">物流發貨明細</h4>
                    <button onClick={() => setShippingForm(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>
                
                <div className="space-y-6 flex-1">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">訂單編號</p>
                        <p className="font-mono text-lg font-bold text-slate-800">{shippingForm.orderId}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">選擇物流商</label>
                            <select 
                                className="px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                value={shippingForm.carrier}
                                onChange={e => setShippingForm({...shippingForm, carrier: e.target.value})}
                            >
                                {carriers.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">追蹤單號</label>
                            <input 
                                className="px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                value={shippingForm.trackingNo}
                                onChange={e => setShippingForm({...shippingForm, trackingNo: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                        <p className="text-xs text-slate-400 mb-2">撿貨狀態核對</p>
                        <div className="flex justify-center space-x-8">
                             <div className="flex items-center space-x-2">
                                <input type="checkbox" id="item_check" className="w-4 h-4 rounded" defaultChecked />
                                <label htmlFor="item_check" className="text-sm font-medium text-slate-600">商品正確</label>
                             </div>
                             <div className="flex items-center space-x-2">
                                <input type="checkbox" id="pkg_check" className="w-4 h-4 rounded" defaultChecked />
                                <label htmlFor="pkg_check" className="text-sm font-medium text-slate-600">包裝加固</label>
                             </div>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={confirmShipping}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all mt-4"
                >
                    確認發貨並打印標籤
                </button>
            </div>
          )}

          {pendingSOs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-slate-300">
              <span className="text-5xl mb-4 opacity-20">📦</span>
              <p className="font-medium">尚無待出貨訂單</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingSOs.map(so => (
                <div key={so.id} className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-center group">
                  <div>
                    <div className="flex items-center space-x-2">
                        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">銷售單: {so.id}</p>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <p className="text-[10px] font-bold text-slate-400">{so.date}</p>
                    </div>
                    <p className="text-lg font-bold text-slate-800 mt-1">
                       {customers.find(c => c.id === so.customerId)?.name || '未知客戶'}
                    </p>
                    <p className="text-sm font-semibold text-rose-600 flex items-center mt-1">
                      <span className="bg-rose-50 px-2 py-0.5 rounded text-[10px] mr-2">待撿貨</span>
                      {products.find(p => p.id === so.productId)?.name} x {so.quantity}
                    </p>
                  </div>
                  <button 
                    onClick={() => initiateShipping(so.id)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:scale-105 transition-all active:scale-95"
                  >
                    準備出貨
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
