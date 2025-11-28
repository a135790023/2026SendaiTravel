
import React, { useState } from 'react';
import { ITINERARY } from '../constants';
import { Navigation, Car, Plane, Clock, MapPin, X, PlaneTakeoff, PlaneLanding, Info, Lightbulb } from 'lucide-react';
import { FlightDetails, ItineraryItem } from '../types';

const Itinerary: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState<FlightDetails | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<ItineraryItem | null>(null);

  const handleOpenMap = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
  };

  return (
    <div className="min-h-full bg-transparent pb-24 relative">
      
      {/* 1. Flight Detail Modal (Digital Boarding Pass) */}
      {selectedFlight && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-simple transform-gpu">
          {/* Backdrop: Subtle dark overlay for focus */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setSelectedFlight(null)}
          ></div>
          
          {/* Modal Content: Increased opacity for better glass effect on iOS */}
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/20 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
             <div className="h-32 bg-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-purple-500/10"></div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <h3 className="text-white/90 text-2xl font-black tracking-widest uppercase z-10 drop-shadow-md">Boarding Pass</h3>
             </div>
             <div className="px-6 py-6 relative">
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                   <div>
                     <p className="text-blue-200/80 text-xs font-bold uppercase tracking-wider mb-1">Airline</p>
                     <p className="text-white font-bold text-lg drop-shadow-md">{selectedFlight.airline}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-blue-200/80 text-xs font-bold uppercase tracking-wider mb-1">Flight No</p>
                     <p className="text-yellow-400 font-mono text-2xl font-black drop-shadow-md">{selectedFlight.flightNo}</p>
                   </div>
                </div>
                <div className="flex justify-between items-center mb-8">
                   <div className="text-center">
                      <p className="text-4xl font-black text-white drop-shadow-lg">{selectedFlight.departure.code}</p>
                      <p className="text-xs text-gray-300 mt-1">{selectedFlight.departure.city}</p>
                   </div>
                   <div className="flex-1 px-4 flex flex-col items-center">
                      <div className="flex items-center text-gray-300 text-xs mb-1 font-mono">{selectedFlight.duration}</div>
                      <div className="w-full h-0.5 bg-white/30 relative flex items-center justify-center">
                         <div className="w-2 h-2 bg-white rounded-full absolute left-0 shadow-[0_0_5px_white]"></div>
                         <div className="w-2 h-2 bg-white rounded-full absolute right-0 shadow-[0_0_5px_white]"></div>
                         <Plane className="text-yellow-400 fill-current rotate-90 absolute drop-shadow-lg" size={16} />
                      </div>
                   </div>
                   <div className="text-center">
                      <p className="text-4xl font-black text-white drop-shadow-lg">{selectedFlight.arrival.code}</p>
                      <p className="text-xs text-gray-300 mt-1">{selectedFlight.arrival.city}</p>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-transparent rounded-xl p-4 border border-white/10">
                   <div>
                      <div className="flex items-center space-x-1 text-xs text-gray-400 font-bold uppercase mb-1">
                        <PlaneTakeoff size={12} /> <span>Departs</span>
                      </div>
                      <p className="text-xl font-bold text-white">{selectedFlight.departure.time}</p>
                      <p className="text-xs text-blue-200 mt-0.5">Terminal {selectedFlight.departure.terminal}</p>
                   </div>
                   <div>
                      <div className="flex items-center space-x-1 text-xs text-gray-400 font-bold uppercase mb-1">
                        <PlaneLanding size={12} /> <span>Arrives</span>
                      </div>
                      <p className="text-xl font-bold text-white">{selectedFlight.arrival.time}</p>
                      <p className="text-xs text-blue-200 mt-0.5">Terminal {selectedFlight.arrival.terminal}</p>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedFlight(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors border border-white/20"
                >
                  <X size={16} />
                </button>
             </div>
          </div>
        </div>
      )}

      {/* 2. Place Detail Modal (Premium Glass - Increased Opacity for Visibility) */}
      {selectedPlace && !selectedPlace.flight && (
         <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center sm:p-4 animate-fade-simple transform-gpu">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity"
             onClick={() => setSelectedPlace(null)}
           ></div>

           {/* Modal Card: Increased opacity to slate-900/60 to ensure blur renders on iOS */}
           <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border-t sm:border border-white/20 max-h-[90vh] overflow-y-auto no-scrollbar ring-1 ring-white/10">
             
             {/* Header Image */}
             <div className="relative h-72 w-full flex-shrink-0 bg-slate-900">
               <img 
                 src={selectedPlace.image} 
                 alt={selectedPlace.location} 
                 className="w-full h-full object-cover opacity-95"
               />
               {/* Gradient overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
               
               <button 
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all z-20 shadow-lg active:scale-90"
                >
                  <X size={20} />
               </button>

               <div className="absolute bottom-0 left-0 right-0 p-6 pt-12">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono text-blue-50 mb-3 shadow-lg">
                     <Clock size={12} className="mr-1.5" />
                     {selectedPlace.time}
                  </div>
                  <h2 className="text-3xl font-bold text-white leading-none drop-shadow-xl tracking-tight">{selectedPlace.location}</h2>
               </div>
             </div>

             {/* Content Body */}
             <div className="p-6 space-y-6 pb-24">
                
                {/* Description */}
                <div>
                   <p className="text-white leading-relaxed font-light text-base tracking-wide drop-shadow-md">
                     {selectedPlace.description || "尚無詳細介紹。"}
                   </p>
                </div>

                {/* Operating Hours */}
                {selectedPlace.openingHours && (
                  <div className="flex items-start space-x-4 bg-transparent rounded-2xl p-4 border border-white/10">
                     <div className="p-2 rounded-full border border-blue-400/30 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                       <Clock className="text-blue-300" size={18} />
                     </div>
                     <div>
                        <h4 className="text-white/90 text-sm font-bold mb-0.5 tracking-wide drop-shadow">營業時間</h4>
                        <p className="text-gray-200 text-sm font-mono drop-shadow-sm">{selectedPlace.openingHours}</p>
                     </div>
                  </div>
                )}

                {/* Tips */}
                {selectedPlace.tips && (
                  <div className="flex items-start space-x-4 bg-transparent rounded-2xl p-4 border border-white/10">
                     <div className="p-2 rounded-full border border-yellow-400/30 shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                        <Lightbulb className="text-yellow-300" size={18} />
                     </div>
                     <div>
                        <h4 className="text-white/90 text-sm font-bold mb-0.5 tracking-wide drop-shadow">貼心提醒</h4>
                        <p className="text-gray-200 text-sm leading-relaxed drop-shadow-sm">{selectedPlace.tips}</p>
                     </div>
                  </div>
                )}

                {/* Navigation Button */}
                {selectedPlace.query && (
                  <button 
                    onClick={() => handleOpenMap(selectedPlace.query!)}
                    className="w-full bg-transparent hover:bg-white/5 text-white font-bold py-4 px-4 rounded-2xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] border border-white/20 backdrop-blur-sm group shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                  >
                    <Navigation size={18} className="text-blue-300 group-hover:text-blue-200 animate-pulse" />
                    <span className="tracking-widest text-sm drop-shadow-md">開啟導航</span>
                  </button>
                )}

             </div>
           </div>
         </div>
      )}

      {/* FIXED Top Header for Stability */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-lg pt-safe-top pb-4 px-4 transition-all">
        <div className="mt-2 flex items-center justify-between mb-4">
           <h2 className="text-2xl font-bold text-white tracking-tight flex items-center drop-shadow-md">
             <MapPin className="mr-2 text-blue-400" size={20} /> 行程總覽
           </h2>
        </div>
        
        {/* Dark Mode Day Selector */}
        <div className="flex overflow-x-auto no-scrollbar space-x-3 pb-1">
          {ITINERARY.map((day, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveDay(index);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                activeDay === index
                  ? 'bg-blue-600/40 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              Day {index + 1}
            </button>
          ))}
        </div>

        {/* Active Day Title */}
        <div className="animate-fade-simple mt-4 pl-1">
           <h3 className="text-xl font-black text-white tracking-tight drop-shadow-md">{ITINERARY[activeDay].title}</h3>
           <p className="text-gray-300 text-xs font-medium uppercase tracking-wider mt-1">
            {ITINERARY[activeDay].date} · {ITINERARY[activeDay].dayOfWeek}
          </p>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative px-4 pb-6 space-y-8 z-10 pt-[190px]">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-[210px] bottom-6 w-0.5 bg-gradient-to-b from-blue-500/50 via-gray-600/30 to-transparent z-0"></div>

        {ITINERARY[activeDay].items.map((item, idx) => (
          <div key={idx} className="relative group animate-fade-simple" style={{ animationDelay: `${idx * 50}ms` }}>
            <div className="flex items-start z-10 relative">
              
              {/* Timeline Node */}
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-slate-900 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 mt-6 flex items-center justify-center ${item.isTransport ? 'bg-gray-600' : 'bg-blue-500'}`}>
                  {item.isTransport && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
              </div>
              
              {/* Content Card */}
              <div 
                 className="relative ml-4 flex-1"
                 onClick={() => {
                   if (item.flight) {
                     setSelectedFlight(item.flight);
                   } else if (!item.isTransport) {
                     setSelectedPlace(item);
                   }
                 }}
              >
                 
                 {/* Card Container */}
                 <div className={`bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:bg-white/15 transition-all duration-300 ${!item.isTransport || item.flight ? 'cursor-pointer hover:border-blue-400/40 hover:shadow-blue-900/20' : ''}`}>
                    
                    {/* Visual Header (Image) */}
                    {item.image ? (
                      <div className="h-40 w-full relative group-hover:opacity-100 transition-all duration-500 ease-out">
                         <img src={item.image} alt={item.location} className="w-full h-full object-cover opacity-90" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                         
                         {/* TIME BADGE */}
                         <div className="absolute top-0 left-0 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-br-xl border-r border-b border-white/10 flex items-center shadow-lg">
                            <Clock size={10} className="text-blue-300 mr-1.5" />
                            <span className="text-xs font-bold text-white tracking-wide font-mono">{item.time}</span>
                         </div>

                         {/* Navigation Button */}
                         {!item.isTransport && item.query && (
                           <button
                             onClick={(e) => {
                               e.stopPropagation();
                               handleOpenMap(item.query!);
                             }}
                             className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300 active:scale-95 shadow-lg"
                           >
                             <Navigation size={14} />
                           </button>
                         )}
                         
                         {/* Flight Indicator */}
                         {item.flight && (
                            <div className="absolute top-3 right-3 bg-yellow-400/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 rounded-full border border-yellow-300 shadow-lg animate-pulse">
                               TAP FOR PASS
                            </div>
                         )}

                         <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                           <h4 className="font-bold text-lg text-white leading-tight drop-shadow-md shadow-black">{item.location}</h4>
                           {!item.isTransport && !item.flight && (
                             <Info size={16} className="text-white/80 mb-1" />
                           )}
                         </div>
                      </div>
                    ) : (
                      /* Text Only Header */
                      <div className="p-4 border-b border-white/5 relative">
                         <div className="flex items-center text-xs text-blue-300 font-mono mb-2 bg-blue-500/20 inline-block px-2 py-0.5 rounded border border-blue-400/20">
                            <Clock size={10} className="mr-1" />
                            {item.time}
                         </div>
                         <h4 className="font-bold text-lg text-white">{item.location}</h4>
                      </div>
                    )}

                    {/* Activity Details */}
                    <div className="p-4 pt-3">
                       <p className="text-sm text-gray-200 leading-relaxed font-light line-clamp-2">
                         {item.isTransport && (
                           <span className="inline-block mr-2 text-gray-400">
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
