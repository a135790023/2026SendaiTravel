import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, Snowflake, ArrowRightLeft } from 'lucide-react';

const Tools: React.FC = () => {
  const [jpy, setJpy] = useState<string>('');
  const [twd, setTwd] = useState<string>('');
  const [rate, setRate] = useState<number>(0.22); // Default estimate: 1 JPY = 0.22 TWD
  const [lastEdited, setLastEdited] = useState<'jpy' | 'twd'>('jpy');

  useEffect(() => {
    // Load saved rate if available
    const savedRate = localStorage.getItem('sendai_exchange_rate');
    if (savedRate) {
      setRate(parseFloat(savedRate));
    }
  }, []);

  const handleRateChange = (newRate: string) => {
    const r = parseFloat(newRate);
    if (!isNaN(r)) {
      setRate(r);
      localStorage.setItem('sendai_exchange_rate', newRate);
      // Recalculate based on last edited field
      if (lastEdited === 'jpy' && jpy) {
        setTwd((parseFloat(jpy) * r).toFixed(0));
      } else if (lastEdited === 'twd' && twd) {
        setJpy((parseFloat(twd) / r).toFixed(0));
      }
    }
  };

  const handleJpyChange = (val: string) => {
    setJpy(val);
    setLastEdited('jpy');
    if (val === '') {
      setTwd('');
    } else {
      setTwd((parseFloat(val) * rate).toFixed(0));
    }
  };

  const handleTwdChange = (val: string) => {
    setTwd(val);
    setLastEdited('twd');
    if (val === '') {
      setJpy('');
    } else {
      setJpy((parseFloat(val) / rate).toFixed(0));
    }
  };

  return (
    <div className="pb-24 animate-fade-in min-h-full bg-gradient-to-b from-winter-100 to-ios-bg">
      <div className="glass sticky top-0 z-10 p-6 pb-4 border-b border-white/50">
        <div className="flex items-center justify-between mb-2">
           <h2 className="text-2xl font-bold text-gray-900">實用工具</h2>
           <Calculator className="text-blue-500" />
        </div>
        <p className="text-gray-500 text-sm">匯率換算 & 旅行小幫手</p>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Currency Converter Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-white p-6 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300"></div>

          <div className="flex items-center space-x-2 mb-6 text-winter-text">
            <RefreshCw size={18} className="text-blue-500" />
            <h3 className="font-bold text-lg">匯率計算機</h3>
          </div>

          <div className="space-y-6 relative z-10">
            {/* JPY Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
                日幣 (JPY)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={jpy}
                  onChange={(e) => handleJpyChange(e.target.value)}
                  placeholder="0"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-4 text-3xl font-light text-gray-900 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-300"
                  inputMode="decimal"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  ¥
                </span>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center -my-2 opacity-50">
              <ArrowRightLeft className="rotate-90 text-gray-400" size={20} />
            </div>

            {/* TWD Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
                台幣 (TWD)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={twd}
                  onChange={(e) => handleTwdChange(e.target.value)}
                  placeholder="0"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-4 text-3xl font-light text-gray-900 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-300"
                  inputMode="decimal"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  $
                </span>
              </div>
            </div>

            {/* Rate Setting */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">目前匯率 (1 JPY = ? TWD)</span>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                 <span className="text-xs text-gray-400 mr-2">Rate:</span>
                 <input 
                    type="number" 
                    value={rate}
                    onChange={(e) => handleRateChange(e.target.value)}
                    className="w-16 bg-transparent text-right text-sm font-bold text-gray-700 outline-none"
                    step="0.001"
                 />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips Card */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <Snowflake className="absolute top-4 right-4 text-white/20 w-16 h-16 animate-pulse" />
          <h3 className="font-bold text-lg mb-4 flex items-center">
             <Snowflake size={18} className="mr-2" />
             冬季購物小貼士
          </h3>
          <ul className="space-y-3 text-sm text-blue-50">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-200 rounded-full mt-1.5 mr-2"></span>
              滿 5,500 日圓可退稅 (10%)。
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-200 rounded-full mt-1.5 mr-2"></span>
              刷卡建議選擇「日幣」結帳較划算。
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-200 rounded-full mt-1.5 mr-2"></span>
              仙台車站 S-PAL 很好逛，伴手禮一站買齊。
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Tools;