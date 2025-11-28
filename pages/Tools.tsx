
import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, Snowflake, ExternalLink, Loader2 } from 'lucide-react';

const Tools: React.FC = () => {
  const [jpy, setJpy] = useState<string>('');
  const [twd, setTwd] = useState<string>('');
  const [rate, setRate] = useState<number>(0.215); // Default fallback
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const [lastEdited, setLastEdited] = useState<'jpy' | 'twd'>('jpy');

  // Fetch Live Rate on Mount
  useEffect(() => {
    fetchLiveRate();
  }, []);

  const fetchLiveRate = async () => {
    setIsLoadingRate(true);
    try {
      // Using a free, reliable standard API for JPY base rates
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/JPY');
      const data = await response.json();
      const marketRate = data.rates.TWD;
      
      // Market rate usually differs slightly from Bank selling rate. 
      // We use it as a good baseline.
      if (marketRate) {
        setRate(marketRate);
        localStorage.setItem('sendai_exchange_rate', marketRate.toString());
        // Recalculate if values exist
        if (jpy) {
           setTwd((parseFloat(jpy) * marketRate).toFixed(0));
        }
      }
    } catch (error) {
      console.error("Rate fetch failed, using saved or default");
      const saved = localStorage.getItem('sendai_exchange_rate');
      if (saved) setRate(parseFloat(saved));
    } finally {
      setIsLoadingRate(false);
    }
  };

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
    <div className="pb-24 animate-fade-simple min-h-full bg-transparent transform-gpu">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-2xl border-b border-white/10 p-6 pt-12 pb-6 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-2">
           <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">實用工具</h2>
           <Calculator className="text-blue-400" />
        </div>
        <p className="text-gray-300 text-sm">匯率換算 & 旅行小幫手</p>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Currency Converter Card - Stable Smoked Glass */}
        <div className="bg-slate-900/20 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-6 relative overflow-hidden group transform-gpu">
          {/* Decorative Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-700"></div>
          
          <div className="flex items-center justify-between mb-6 text-white relative z-10">
            <div className="flex items-center space-x-2">
              <RefreshCw size={18} className="text-blue-400" />
              <h3 className="font-bold text-lg">匯率計算機</h3>
            </div>
            <button 
              onClick={fetchLiveRate}
              className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all text-blue-300"
              title="更新匯率"
            >
              {isLoadingRate ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            </button>
          </div>

          <div className="space-y-4 relative z-10">
            {/* JPY Input */}
            <div>
              <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wider flex justify-between">
                <span>日幣 (JPY)</span>
                <span className="text-white/50">購物金額</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={jpy}
                  onChange={(e) => handleJpyChange(e.target.value)}
                  placeholder="0"
                  className="w-full bg-black/30 border border-white/10 rounded-2xl py-4 px-4 text-3xl font-light text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder-gray-500 outline-none"
                  inputMode="decimal"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  ¥
                </span>
              </div>
            </div>

            {/* Separator Line (No Swap Button) */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"></div>

            {/* TWD Input */}
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider flex justify-between">
                <span>台幣 (TWD)</span>
                <span className="text-white/50">約合台幣</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={twd}
                  onChange={(e) => handleTwdChange(e.target.value)}
                  placeholder="0"
                  className="w-full bg-black/30 border border-white/10 rounded-2xl py-4 px-4 text-3xl font-light text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder-gray-500 outline-none"
                  inputMode="decimal"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  $
                </span>
              </div>
            </div>

            {/* Rate Setting & BOT Link */}
            <div className="pt-4 mt-2 flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                   <span className="text-xs text-gray-400">計算匯率:</span>
                   <input 
                      type="number" 
                      value={rate}
                      onChange={(e) => handleRateChange(e.target.value)}
                      className="w-16 bg-black/20 border border-white/10 rounded px-2 py-1 text-right text-sm font-bold text-blue-400 outline-none focus:border-blue-500"
                      step="0.001"
                   />
                </div>
                <span className="text-[10px] text-gray-500">
                  {isLoadingRate ? '更新中...' : '即時匯率自動更新'}
                </span>
              </div>

              <a 
                href="https://rate.bot.com.tw/xrt?Lang=zh-TW" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs text-gray-300"
              >
                <span>查看台灣銀行牌告匯率</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Tips Card - Light Theme (Solid Background) */}
        <div className="bg-slate-100/95 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-lg relative overflow-hidden transform-gpu">
          
          <Snowflake className="absolute top-4 right-4 text-blue-200/50 w-24 h-24 animate-spin-slow" />
          <h3 className="font-bold text-lg mb-4 flex items-center relative z-10 text-blue-800">
             <Snowflake size={18} className="mr-2 text-blue-500" />
             旅遊小提醒
          </h3>
          <ul className="space-y-3 text-sm text-slate-700 relative z-10 font-medium">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 shadow-sm"></span>
              滿 5,500 日圓可退稅 (10%)。
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 shadow-sm"></span>
              刷卡建議選擇「日幣」結帳較划算。
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 shadow-sm"></span>
              大家滑雪要小心，雪場遠離蘇進吉，他撞到不負責。
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Tools;
