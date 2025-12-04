
import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, Snowflake, ExternalLink, Loader2, BellRing, Send, Radio, BellOff, Terminal } from 'lucide-react';
import { VAPID_PUBLIC_KEY } from '../constants';

// --- Configuration ---
// 已更新為您的 Render 後端網址
const API_URL = 'https://my-push-server-mwat.onrender.com'; 

const Tools: React.FC = () => {
  const [jpy, setJpy] = useState<string>('');
  const [twd, setTwd] = useState<string>('');
  const [rate, setRate] = useState<number>(0.215); // Default fallback
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const [lastEdited, setLastEdited] = useState<'jpy' | 'twd'>('jpy');
  
  // Notification States
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notifTitle, setNotifTitle] = useState('集合提醒');
  const [notifBody, setNotifBody] = useState('明天早上 08:00 大廳集合！');
  
  // Remote Push States
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  // System Log State
  const [statusLogs, setStatusLogs] = useState<string[]>([
    '你想說什麼...',
    '蘇進吉 ＝ 兩津勘吉。'
  ]);

  // Helper to add log
  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
    setStatusLogs(prev => [`[${time}] ${msg}`, ...prev]);
  };

  // Fetch Live Rate on Mount
  useEffect(() => {
    fetchLiveRate();
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
    // Check if already subscribed to service worker push
    if ('serviceWorker' in navigator) {
       navigator.serviceWorker.ready.then(registration => {
         registration.pushManager.getSubscription().then(subscription => {
           if (subscription) {
             setIsSubscribed(true);
             addLog('已偵測到現有訂閱。');
           }
         });
       });
    }
  }, []);

  const fetchLiveRate = async () => {
    setIsLoadingRate(true);
    try {
      // Using a free, reliable standard API for JPY base rates
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/JPY');
      const data = await response.json();
      const marketRate = data.rates.TWD;
      
      if (marketRate) {
        setRate(marketRate);
        localStorage.setItem('sendai_exchange_rate', marketRate.toString());
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

  // --- Remote Push Logic (Requires Backend) ---
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToPush = async () => {
    if (!('serviceWorker' in navigator)) {
      addLog("錯誤：瀏覽器不支援 Service Worker。");
      return;
    }

    // 檢查權限
    if (Notification.permission === 'denied') {
      addLog("錯誤：通知權限已被拒絕。");
      return;
    }

    setIsSubscribing(true);
    addLog("正在請求訂閱...");
    try {
      const register = await navigator.serviceWorker.ready;
      if (!register) {
        throw new Error("Service Worker 尚未準備好。");
      }
      
      // 訂閱
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      // 傳送給後端
      addLog(`正在連線後端...`);
      const response = await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'content-type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`後端連線失敗 (${response.status})`);
      }

      setIsSubscribed(true);
      setPermission(Notification.permission);
      addLog("✅ 訂閱成功！");
    } catch (err: any) {
      console.error(err);
      addLog(`❌ 訂閱失敗: ${err.message || err}`);
    } finally {
      setIsSubscribing(false);
    }
  };

  const unsubscribeFromPush = async () => {
    if (!confirm('確定要取消接收通知嗎？')) return;
    
    setIsSubscribing(true);
    addLog("正在取消訂閱...");
    try {
       if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                // 1. 告訴瀏覽器：放棄這個訂閱
                await subscription.unsubscribe();

                // 2. 告訴後端：把資料刪除
                await fetch(`${API_URL}/unsubscribe`, {
                    method: 'POST',
                    body: JSON.stringify({ endpoint: subscription.endpoint }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                setIsSubscribed(false);
                addLog("已取消訂閱，狀態重置。");
            } else {
                addLog("目前沒有有效訂閱。");
                setIsSubscribed(false);
            }
        }
    } catch (error: any) {
        console.error('取消訂閱失敗:', error);
        addLog(`❌ 重置失敗: ${error.message}`);
    } finally {
        setIsSubscribing(false);
    }
  };

  const sendRemoteBroadcast = async () => {
    addLog("正在發送廣播...");
    try {
      // Changed: Use 'message' key instead of 'body' to avoid confusion
      const payload = {
        title: notifTitle || '測試推播',
        message: notifBody || '這是從前端呼叫後端發送的測試訊息！',
        url: window.location.href
      };
      
      const response = await fetch(`${API_URL}/broadcast`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'content-type': 'application/json'
        }
      });

      if (!response.ok) throw new Error("後端回應錯誤");
      
      addLog("✅ 廣播已發送！");
    } catch (err: any) {
       console.error(err);
       addLog(`❌ 發送失敗: ${err.message}`);
    }
  };

  return (
    <div className="pb-24 animate-fade-simple min-h-full bg-transparent transform-gpu">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-black/40 backdrop-blur-2xl border-b border-white/10 p-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-2">
           <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">實用工具</h2>
           <Calculator className="text-blue-400" />
        </div>
        <p className="text-gray-300 text-sm">匯率換算 & 旅行小幫手</p>
      </div>

      <div className="p-5 space-y-6 pt-36">
        
        {/* Currency Converter Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-6 relative overflow-hidden group transform-gpu">
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

            {/* Separator Line */}
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

        {/* Quick Tips Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-lg relative overflow-hidden transform-gpu">
          <Snowflake className="absolute top-4 right-4 text-blue-400/10 w-24 h-24 animate-spin-slow" />
          <h3 className="font-bold text-lg mb-4 flex items-center relative z-10 text-blue-300">
             <Snowflake size={18} className="mr-2 text-blue-400" />
             旅遊小提醒
          </h3>
          <ul className="space-y-3 text-sm text-gray-200 relative z-10 font-medium">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
              滿 5,500 日圓可退稅 (10%)。
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
              刷卡建議選擇「日幣」結帳較划算。
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
              雪場遠離蘇進吉，他撞到不負責。
            </li>
          </ul>
        </div>
        
        {/* Communication & Notification Center */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-lg relative overflow-hidden transform-gpu">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-blue-300">
                 <BellRing className="mr-3" size={20} />
                 <h3 className="font-bold text-white">推播廣播中心</h3>
              </div>
              <div className={`text-[10px] px-2 py-1 rounded-full border ${permission === 'granted' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-gray-500/50 text-gray-400'}`}>
                 {permission === 'granted' ? '推播已就緒' : '未開啟權限'}
              </div>
           </div>
           
           <div className="space-y-3">
             {/* Inputs */}
             <input 
               type="text" 
               value={notifTitle}
               onChange={e => setNotifTitle(e.target.value)}
               placeholder="標題 (例：集合時間)"
               className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-400"
             />
             <textarea 
               value={notifBody}
               onChange={e => setNotifBody(e.target.value)}
               placeholder="內容 (例：明天早上 08:00 大廳集合)"
               className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-400 h-20 resize-none"
             />

             {/* Action Grid */}
             <div className="grid grid-cols-2 gap-3 pt-2">
                {/* 1. Subscribe / Unsubscribe */}
                {isSubscribed ? (
                  <button 
                      onClick={unsubscribeFromPush}
                      disabled={isSubscribing}
                      className="flex items-center justify-center space-x-2 py-3 rounded-xl transition-all active:scale-95 border bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                  >
                      {isSubscribing ? <Loader2 size={14} className="animate-spin" /> : <BellOff size={14} />}
                      <span className="text-xs font-bold">取消訂閱</span>
                  </button>
                ) : (
                  <button 
                      onClick={subscribeToPush}
                      disabled={isSubscribing}
                      className="flex items-center justify-center space-x-2 py-3 rounded-xl transition-all active:scale-95 border bg-gray-700/30 border-gray-600/30 text-gray-300 hover:bg-gray-700/50"
                  >
                      {isSubscribing ? <Loader2 size={14} className="animate-spin" /> : <Radio size={14} />}
                      <span className="text-xs font-bold">開啟通知</span>
                  </button>
                )}

                {/* 2. Remote Broadcast */}
                <button 
                    onClick={sendRemoteBroadcast}
                    className="flex items-center justify-center space-x-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 py-3 rounded-xl transition-all active:scale-95"
                >
                    <Send size={14} />
                    <span className="text-xs font-bold">發送廣播</span>
                </button>
            </div>
            
            {/* System Log Display */}
            <div className="mt-4 border-t border-white/10 pt-4">
                <div className="flex items-center mb-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                    <Terminal size={12} className="mr-1.5" />
                    系統日誌
                </div>
                <div className="bg-black/30 border border-white/5 rounded-xl p-3 h-24 overflow-y-auto font-mono text-[10px] leading-relaxed text-green-400 shadow-inner">
                    {statusLogs.length > 0 ? (
                        statusLogs.map((log, index) => (
                            <div key={index} className="mb-1 border-b border-white/5 pb-1 last:border-0">{log}</div>
                        ))
                    ) : (
                        <span className="text-gray-600 italic">無紀錄...</span>
                    )}
                </div>
            </div>

            <p className="text-[9px] text-gray-600 text-center mt-2 font-mono truncate">
                Server: {API_URL.replace('https://', '')}
            </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Tools;
