
import React, { useState } from 'react';
import { ITINERARY } from '../constants';
import { Navigation, Car, Plane, Clock, MapPin, X, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { FlightDetails } from '../types';

const Itinerary: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState<FlightDetails | null>(null);

  const handleOpenMap = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-full bg-slate-900 pb-24 relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/20 blur-3xl opacity-50"></div>
         <div className="absolute bottom-0 right-0 w-full h-96 bg-purple-900/10 blur-3xl opacity-30"></div>
      </div>

      {/* Flight Detail Modal (Digital Boarding Pass) */}
      {selectedFlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedFlight(null)}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl transform transition-all scale-100">
             {/* Decorative Top */}
             <div className="h-32 bg-gradient-to-r from-yellow-700 to-yellow-600 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <h3 className="text-white text-2xl font-black tracking-widest uppercase z-10 drop-shadow-md">Boarding Pass</h3>
             </div>

             <div className="px-6 py-6 relative">
                {/* Airline & Flight No */}
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                   <div>
                     <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Airline</p>
                     <p className="text-white font-bold text-lg">{selectedFlight.airline}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Flight No</p>
                     <p className="text-yellow-500 font-mono text-2xl font-black">{selectedFlight.flightNo}</p>
                   </div>
                </div>

                {/* Route Visualization */}
                <div className="flex justify-between items-center mb-8">
                   <div className="text-center">
                      <p className="text-4xl font-black text-white">{selectedFlight.departure.code}</p>
                      <p className="text-xs text-gray-400 mt-1">{selectedFlight.departure.city}</p>
                   </div>
                   
                   <div className="flex-1 px-4 flex flex-col items-center">
                      <div className="flex items-center text-gray-500 text-xs mb-1 font-mono">{selectedFlight.duration}</div>
                      <div className="w-full h-0.5 bg-gray-600 relative flex items-center justify-center">
                         <div className="w-2 h-2 bg-white rounded-full absolute left-0"></div>
                         <div className="w-2 h-2 bg-white rounded-full absolute right-0"></div>
                         <Plane className="text-yellow-500 fill-current rotate-90 absolute" size={16} />
                      </div>
                   </div>

                   <div className="text-center">
                      <p className="text-4xl font-black text-white">{selectedFlight.arrival.code}</p>
                      <p className="text-xs text-gray-400 mt-1">{selectedFlight.arrival.city}</p>
                   </div>
                </div>

                {/* Time & Terminal Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-black/20 rounded-xl p-4 border border-white/5">
                   <div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 font-bold uppercase mb-1">
                        <PlaneTakeoff size={12} /> <span>Departs</span>
                      </div>
                      <p className="text-xl font-bold text-white">{selectedFlight.departure.time}</p>
                      <p className="text-xs text-blue-300 mt-0.5">Terminal {selectedFlight.departure.terminal}</p>
                   </div>
                   <div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 font-bold uppercase mb-1">
                        <PlaneLanding size={12} /> <span>Arrives</span>
                      </div>
                      <p className="text-xl font-bold text-white">{selectedFlight.arrival.time}</p>
                      <p className="text-xs text-blue-300 mt-0.5">Terminal {selectedFlight.arrival.terminal}</p>
                   </div>
                </div>

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedFlight(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white/70 hover:bg-black/40 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
             </div>
             
             {/* Cutout Effect */}
             <div className="absolute top-[128px] -left-3 w-6 h-6 bg-slate-900 rounded-full z-20"></div>
             <div className="absolute top-[128px] -right-3 w-6 h-6 bg-slate-900 rounded-full z-20"></div>
          </div>
        </div>
      )}

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
              <div 
                 className="relative ml-4 flex-1"
                 onClick={() => {
                   if (item.flight) {
                     setSelectedFlight(item.flight);
                   }
                 }}
              >
                 
                 {/* Card Container */}
                 <div className={`bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:bg-slate-800/70 transition-colors duration-300 ${item.flight ? 'cursor-pointer hover:border-yellow-500/50' : ''}`}>
                    
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
                         
                         {/* Flight Indicator */}
                         {item.flight && (
                            <div className="absolute top-3 right-3 bg-yellow-500/80 backdrop-blur text-black text-[10px] font-bold px-2 py-1 rounded-full border border-yellow-300/50 shadow-lg animate-pulse">
                               TAP FOR DETAILS
                            </div>
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
