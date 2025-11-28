
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
    <div className="pb-24 animate-fade-in bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-full">
      {/* Sticky Glass Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/50 p-6 pt-12 pb-4 sticky top-0 z-20 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-2">
           <h2 className="text-2xl font-bold text-gray-900 drop-shadow-sm">行李準備</h2>
           <div className="bg-blue-100/50 p-2 rounded-full">
             <Snowflake className="text-blue-400 w-5 h-5" />
           </div>
        </div>
        <p className="text-gray-500 text-sm mb-4">冬季日本東北必備清單</p>
        
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-xs text-blue-600 font-medium mt-1">{progress}% 完成</div>
      </div>

      <div className="p-4 space-y-6">
        {Object.entries(groupedItems).map(([category, items]) => {
          const categoryItems = items as PackingItem[];
          return (
            <div key={category}>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1 flex items-center">
                <span className="w-1 h-3 bg-blue-300 rounded-full mr-2"></span>
                {category}
              </h3>
              <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden">
                {categoryItems.map((item, idx) => (
                  <div 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 flex items-center cursor-pointer transition-colors active:bg-blue-50/50 ${idx !== categoryItems.length - 1 ? 'border-b border-gray-100/50' : ''}`}
                  >
                    <div className={`mr-4 transition-all duration-300 ${item.completed ? 'text-blue-500 scale-110' : 'text-gray-300'}`}>
                      {item.completed ? <CheckCircle2 size={24} className="fill-blue-50" /> : <Circle size={24} />}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${item.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center pb-8">
        <button 
          onClick={() => {
            if(confirm('確定要重置所有清單狀態嗎？')) {
               setItems(WINTER_PACKING_LIST);
            }
          }}
          className="text-xs text-gray-400 underline hover:text-gray-600 transition-colors"
        >
          重置清單
        </button>
      </div>
    </div>
  );
};

export default PackingList;
