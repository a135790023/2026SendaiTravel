
import React, { useState } from 'react';
import { ITINERARY } from '../constants';
import { MapPin, Navigation, Car, Plane, Clock, Map } from 'lucide-react';

const Itinerary: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);

  const handleOpenMap = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-100 pb-24">
      {/* Sticky Glass Header */}
      <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] pt-12 pb-4 px-4 transition-all">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-sm">行程表</h2>
        
        {/* Day Selection Tabs */}
        <div className="flex overflow-x-auto no-scrollbar space-x-3 mb-4 pb-1">
          {ITINERARY.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap shadow-sm ${
                activeDay === index
                  ? 'bg-gray-900 text-white shadow-lg scale-105 ring-2 ring-gray-900/20'
                  : 'bg-white/80 text-gray-500 border border-white hover:bg-white'
              }`}
            >
              Day {index + 1}
            </button>
          ))}
        </div>

        {/* Active Day Title */}
        <div className="animate-fade-in pl-1">
           <h3 className="text-xl font-black text-gray-800 tracking-tight">{ITINERARY[activeDay].title}</h3>
           <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mt-1">
            {ITINERARY[activeDay].date} · {ITINERARY[activeDay].dayOfWeek}
          </p>
        </div>
      </div>

      {/* Scrollable Timeline Content */}
      <div className="px-4 py-6 space-y-6">
        {ITINERARY[activeDay].items.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline connector */}
            {idx !== ITINERARY[activeDay].items.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-gray-200/80 z-0"></div>
            )}
            
            <div className="flex items-start z-10 relative">
              {/* Number/Icon Bubble */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full border-4 border-white/50 flex items-center justify-center shadow-md z-10 backdrop-blur-sm ${item.isTransport ? 'bg-gray-200/90 text-gray-500' : 'bg-blue-600/90 text-white'}`}>
                 {item.isTransport ? (item.activity.includes('飛機') ? <Plane size={16}/> : <Car size={16}/>) : <span className="text-xs font-bold">{idx + 1}</span>}
              </div>
              
              {/* Content Card with Glass Effect */}
              <div className="relative ml-4 flex-1 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden hover:bg-white/80 transition-colors duration-300">
                 
                 {/* Floating Navigation Button (Textured Icon) */}
                 {!item.isTransport && item.query && (
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       handleOpenMap(item.query!);
                     }}
                     className="absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-md border border-white/60 rounded-full shadow-md text-blue-600 active:scale-90 hover:scale-110 hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300"
                   >
                     <Navigation size={18} strokeWidth={2.5} className="-ml-0.5 mt-0.5" />
                   </button>
                 )}

                 {/* Image Header */}
                 {item.image && (
                   <div className="h-32 w-full relative">
                      <img src={item.image} alt={item.location} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-2 left-3 text-white pr-12">
                         <h4 className="font-bold text-lg leading-tight drop-shadow-md">{item.location}</h4>
                      </div>
                   </div>
                 )}

                 <div className="p-4">
                    {!item.image && <h4 className="font-bold text-gray-900 text-lg mb-1 pr-10">{item.location}</h4>}
                    
                    <div className="flex items-center text-xs text-gray-500 mb-3 font-mono bg-white/50 inline-block px-2 py-1 rounded border border-white/20">
                      <Clock size={12} className="mr-1" />
                      {item.time}
                    </div>
                    
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item.activity}
                    </p>
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
