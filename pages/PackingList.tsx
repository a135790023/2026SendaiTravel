
import React, { useState, useEffect } from 'react';
import { WINTER_PACKING_LIST } from '../constants';
import { PackingItem } from '../types';
import { CheckCircle2, Circle, Snowflake } from 'lucide-react';

const PackingList: React.FC = () => {
  const [items, setItems] = useState<PackingItem[]>(() => {
    const saved = localStorage.getItem('sendai_packing_list');
    if (saved) {
      return JSON.parse(saved);
    }
    return WINTER_PACKING_LIST;
  });

  useEffect(() => {
    localStorage.setItem('sendai_packing_list', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  const progress = Math.round((items.filter(i => i.completed).length / items.length) * 100);

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  return (
    <div className="pb-24 animate-fade-in bg-transparent min-h-full">
      {/* Sticky Glass Header */}
      <div className="bg-black/40 backdrop-blur-2xl border-b border-white/10 p-6 pt-12 pb-6 sticky top-0 z-20 shadow-2xl">
        <div className="flex items-center justify-between mb-2">
           <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">行李準備</h2>
           <div className="bg-blue-500/20 p-2 rounded-full border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
             <Snowflake className="text-blue-300 w-5 h-5 animate-pulse" />
           </div>
        </div>
        <p className="text-gray-300 text-sm mb-4">冬季日本東北必備清單</p>
        
        {/* Neon Progress Bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(34,211,238,0.6)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-xs text-blue-300 font-medium mt-2">{progress}% 完成</div>
      </div>

      <div className="p-4 space-y-8">
        {Object.entries(groupedItems).map(([category, items]) => {
          const categoryItems = items as PackingItem[];
          return (
            <div key={category}>
              <h3 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3 ml-1 flex items-center shadow-black drop-shadow-md">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
                {category}
              </h3>
              {/* Lighter Glass Container */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-lg">
                {categoryItems.map((item, idx) => (
                  <div 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 flex items-center cursor-pointer transition-colors hover:bg-white/5 active:bg-blue-500/20 ${idx !== categoryItems.length - 1 ? 'border-b border-white/10' : ''}`}
                  >
                    <div className={`mr-4 transition-all duration-300 ${item.completed ? 'text-blue-400 scale-110 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]' : 'text-gray-400'}`}>
                      {item.completed ? <CheckCircle2 size={24} className="fill-blue-900/50" /> : <Circle size={24} />}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${item.completed ? 'text-gray-500 line-through decoration-gray-500' : 'text-white'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center pb-8 mt-8">
        <button 
          onClick={() => {
            if(confirm('確定要重置所有清單狀態嗎？')) {
               setItems(WINTER_PACKING_LIST);
            }
          }}
          className="text-xs text-gray-400 underline hover:text-white transition-colors"
        >
          重置清單
        </button>
      </div>
    </div>
  );
};

export default PackingList;
