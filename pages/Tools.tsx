
import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, Snowflake, ArrowRightLeft } from 'lucide-react';

const Tools: React.FC = () => {
  const [jpy, setJpy] = useState<string>('');
  const [twd, setTwd] = useState<string>('');
  const [rate, setRate] = useState<number>(0.22); // Default estimate
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
    <div className="pb-24 animate-fade-in min-h-full bg-transparent">
      <div className="bg-black/60 backdrop-blur-xl border-b border-white/10 p-6 pt-12 pb-6 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-2">
           <h2 className="text-2xl font-bold text-white tracking-tight">實用工具</h2>
           <Calculator className="text-blue-400" />
        </div>
        <p className="text-gray-400 text-sm">匯率換算 & 旅行小幫手</p>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Currency Converter Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-6 relative overflow-hidden group">
          {/* Decorative Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>

          <div className="flex items-center space-x-2 mb-6 text-white relative z-10">
            <RefreshCw size={18} className="text-blue-400" />
            <h3 className="font-bold text-lg">匯率計算機</h3>
          </div>

          <div className="space-y-6 relative z-10">
            {/* JPY Input */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                日幣 (JPY)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={jpy}
                  onChange={(e) => handleJpyChange(e.target.value)}
                  placeholder="0"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-4 text-3xl font-light text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder-gray-700 outline-none"
                  inputMode="decimal"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                  ¥
                </span>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center -my-2">
              <div className="bg-slate-700 p-1.5 rounded-full border border-slate-600 text-gray-400">
                <ArrowRightLeft className="rotate-90" size={16} />
              </div>
            </div>

            {/* TWD Input */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                台幣 (TWD)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={twd}
                  onChange={(e) => handleTwdChange(e.target.value)}
                  placeholder="0"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-4 text-3xl font-light text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder-gray-700 outline-none"
                  inputMode="decimal"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                  $
                </span>
              </div>
            </div>

            {/* Rate Setting */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400">目前匯率 (1 JPY = ? TWD)</span>
              <div className="flex items-center bg-black/30 rounded-lg px-3 py-1 border border-white/5">
                 <span className="text-xs text-gray-500 mr-2">Rate:</span>
                 <input 
                    type="number" 
                    value={rate}
                    onChange={(e) => handleRateChange(e.target.value)}
                    className="w-16 bg-transparent text-right text-sm font-bold text-blue-400 outline-none"
                    step="0.001"
                 />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips Card */}
        <div className="bg-gradient-to-br from-blue-900/80 to-slate-900 border border-blue-500/20 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <Snowflake className="absolute top-4 right-4 text-white/5 w-24 h-24 animate-spin-slow" />
          <h3 className="font-bold text-lg mb-4 flex items-center relative z-10 text-blue-300">
             <Snowflake size={18} className="mr-2" />
             冬季購物小提醒
          </h3>
          <ul className="space-y-3 text-sm text-gray-300 relative z-10">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2 shadow-[0_0_5px_rgba(59,130,246,1)]"></span>
              滿 5,500 日圓可退稅 (10%)。
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2 shadow-[0_0_5px_rgba(59,130,246,1)]"></span>
              刷卡建議選擇「日幣」結帳較划算。
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2 shadow-[0_0_5px_rgba(59,130,246,1)]"></span>
              大家滑雪要小心，雪場遠離蘇進吉，他撞到不負責。
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Tools;
