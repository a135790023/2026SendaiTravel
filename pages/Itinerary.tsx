
import React, { useState } from 'react';
import { ITINERARY } from '../constants';
import { Navigation, Car, Plane, Clock, MapPin } from 'lucide-react';

const Itinerary: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);

  const handleOpenMap = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-full bg-slate-900 pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/20 blur-3xl opacity-50"></div>
         <div className="absolute bottom-0 right-0 w-full h-96 bg-purple-900/10 blur-3xl opacity-30"></div>
      </div>

      {/* Sticky Dark Glass Header */}
      <div className="sticky top-0 z-30 bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl pt-safe-top pb-4 px-4 transition-all">
        <div className="mt-2 flex items-center justify-between mb-4">
           <h2 className="text-2xl font-bold text-white tracking-tight flex items-center">
             <MapPin className="mr-2 text-blue-400" size={20} /> 行程總覽
           </h2>
        </div>
        
        {/* Dark Mode Day Selector */}
        <div className="flex overflow-x-auto no-scrollbar space-x-3 pb-1">
          {ITINERARY.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                activeDay === index
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10 hover:text-gray-300'
              }`}
            >
              Day {index + 1}
            </button>
          ))}
        </div>

        {/* Active Day Title */}
        <div className="animate-fade-in mt-4 pl-1">
           <h3 className="text-xl font-black text-white tracking-tight">{ITINERARY[activeDay].title}</h3>
           <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">
            {ITINERARY[activeDay].date} · {ITINERARY[activeDay].dayOfWeek}
          </p>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative px-4 py-6 space-y-8 z-10">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500/50 via-gray-700/50 to-transparent z-0"></div>

        {ITINERARY[activeDay].items.map((item, idx) => (
          <div key={idx} className="relative group animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
            <div className="flex items-start z-10 relative">
              
              {/* Timeline Node */}
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-slate-900 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 mt-6 flex items-center justify-center ${item.isTransport ? 'bg-gray-700' : 'bg-blue-500'}`}>
                  {item.isTransport && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
              </div>
              
              {/* Content Card */}
              <div className="relative ml-4 flex-1">
                 
                 {/* Card Container */}
                 <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:bg-slate-800/70 transition-colors duration-300">
                    
                    {/* Visual Header (Image) */}
                    {item.image ? (
                      <div className="h-40 w-full relative group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                         <img src={item.image} alt={item.location} className="w-full h-full object-cover opacity-90" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                         
                         {/* TIME BADGE - Top Left */}
                         <div className="absolute top-0 left-0 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-br-xl border-r border-b border-white/10 flex items-center">
                            <Clock size={10} className="text-blue-400 mr-1.5" />
                            <span className="text-xs font-bold text-white tracking-wide font-mono">{item.time}</span>
                         </div>

                         {/* Navigation Button - Top Right Floating */}
                         {!item.isTransport && item.query && (
                           <button
                             onClick={(e) => {
                               e.stopPropagation();
                               handleOpenMap(item.query!);
                             }}
                             className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 active:scale-95"
                           >
                             <Navigation size={14} />
                           </button>
                         )}

                         <div className="absolute bottom-3 left-4 right-4">
                           <h4 className="font-bold text-lg text-white leading-tight drop-shadow-lg shadow-black">{item.location}</h4>
                         </div>
                      </div>
                    ) : (
                      /* Text Only Header */
                      <div className="p-4 border-b border-white/5 relative">
                         {/* Time Badge (Text Only Version) */}
                         <div className="flex items-center text-xs text-blue-400 font-mono mb-2 bg-blue-500/10 inline-block px-2 py-0.5 rounded border border-blue-500/20">
                            <Clock size={10} className="mr-1" />
                            {item.time}
                         </div>
                         <h4 className="font-bold text-lg text-white">{item.location}</h4>
                      </div>
                    )}

                    {/* Activity Details */}
                    <div className="p-4 pt-3">
                       <p className="text-sm text-gray-300 leading-relaxed font-light">
                         {item.isTransport && (
                           <span className="inline-block mr-2 text-gray-500">
                             {item.activity.includes('飛機') ? <Plane size={12} /> : <Car size={12} />}
                           </span>
                         )}
                         {item.activity}
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;