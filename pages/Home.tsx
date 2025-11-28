
import React, { useMemo, useEffect, useState } from 'react';
import WeatherWidget from '../components/WeatherWidget';
import { Calendar, MapPin, ArrowRight, Clock, Navigation, Users } from 'lucide-react';
import { Tab } from '../types';
import { ITINERARY, TRIP_START_DATE } from '../constants';

interface HomeProps {
  setTab: (tab: Tab) => void;
}

const TRAVELERS = [
  '品軒', '詠翔', '家驊', '進吉', '彣如', 
  '鴻儀', '建中', '旭璟', '岳銘'
];

const Home: React.FC<HomeProps> = ({ setTab }) => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number}>({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(TRIP_START_DATE) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toLocaleDateString('zh-TW', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const nextStop = useMemo(() => {
    const now = new Date();
    const allItems = ITINERARY.flatMap(day => 
      day.items.map(item => ({
        ...item,
        dateString: day.date,
        dayTitle: day.title
      }))
    );

    const parseDate = (dateStr: string, timeStr: string) => {
      const startTime = timeStr.split('–')[0].trim();
      const [year, month, day] = dateStr.split('/').map(Number);
      const [hours, minutes] = startTime.split(':').map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    };

    const upcoming = allItems.find(item => {
      const startDate = parseDate(item.dateString, item.time);
      return startDate > now;
    });

    if (upcoming) {
      return { ...upcoming, label: "Next Stop" };
    }

    return { ...allItems[0], label: "旅程起點" };
  }, []);

  // Ginzan Onsen Image URL
  const bgImage = "https://images.unsplash.com/photo-1546816040-6927e16d0046?auto=format&fit=crop&w=1287&q=80";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* 1. Full Screen Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* 2. Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" /> {/* Subtle blur for depth */}

      {/* 3. Content Layer */}
      <div className="relative z-10 flex flex-col h-full pt-safe-top pb-24 px-6 justify-between animate-fade-in">
        
        {/* Top Section: Date & Weather */}
        <div className="flex justify-between items-start mt-4">
          <div className="text-white drop-shadow-md">
            <h1 className="text-2xl font-bold tracking-tight mb-1">Sendai Trip</h1>
            <p className="text-sm font-medium opacity-90 uppercase tracking-widest">{today}</p>
          </div>
          <WeatherWidget variant="minimal" />
        </div>

        {/* Middle Section: Countdown & Travelers */}
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          
          {/* Countdown */}
          <div className="text-center text-white drop-shadow-lg transform -translate-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 opacity-80">Time Until Departure</p>
            <div className="flex items-baseline justify-center space-x-4">
              <div className="flex flex-col items-center">
                 <span className="text-7xl font-thin tracking-tighter">{timeLeft.days}</span>
                 <span className="text-xs font-medium uppercase mt-1 opacity-80">Days</span>
              </div>
              <span className="text-4xl font-thin opacity-50 pb-6">:</span>
              <div className="flex flex-col items-center">
                 <span className="text-7xl font-thin tracking-tighter">{timeLeft.hours}</span>
                 <span className="text-xs font-medium uppercase mt-1 opacity-80">Hours</span>
              </div>
            </div>
            <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
               <span className="text-[10px] font-mono tracking-wider">2026.01.02 — 01.07</span>
            </div>
          </div>

          {/* Travelers List (The Ritual) */}
          <div className="w-full mt-12">
             <div className="flex items-center justify-center mb-3 opacity-70 space-x-2">
                <div className="h-[1px] w-8 bg-white/50"></div>
                <Users size={12} className="text-white" />
                <span className="text-[10px] font-medium text-white uppercase tracking-widest">Travel Members</span>
                <div className="h-[1px] w-8 bg-white/50"></div>
             </div>
             
             {/* Horizontal Scroll Container with Fade Edges */}
             <div className="relative w-full">
                <div className="flex overflow-x-auto no-scrollbar space-x-3 px-4 pb-2 justify-start md:justify-center">
                  {TRAVELERS.map((name, index) => (
                    <div 
                      key={name}
                      className="flex-shrink-0 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-medium tracking-wide shadow-lg hover:bg-white/20 transition-all duration-300 select-none animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
                {/* Fade masks for scroll indicators */}
                <div className="absolute left-0 top-0 bottom-2 w-4 bg-gradient-to-r from-black/20 to-transparent pointer-events-none md:hidden"></div>
                <div className="absolute right-0 top-0 bottom-2 w-4 bg-gradient-to-l from-black/20 to-transparent pointer-events-none md:hidden"></div>
             </div>
          </div>

        </div>

        {/* Bottom Section: Next Stop Glass Card */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2 px-1">
             <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest flex items-center">
               <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
               {nextStop.label}
             </span>
             <button 
                onClick={() => setTab('itinerary')}
                className="text-[10px] text-white/80 hover:text-white flex items-center transition-colors"
             >
               View Full Itinerary <ArrowRight size={10} className="ml-1" />
             </button>
          </div>

          <div 
            onClick={() => setTab('itinerary')}
            className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl transition-all active:scale-[0.98]"
          >
            <div className="p-5 flex items-start space-x-4">
               {/* Thumbnail Image */}
               {nextStop.image && (
                 <div className="h-16 w-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0 border border-white/10">
                   <img src={nextStop.image} alt="Location" className="h-full w-full object-cover" />
                 </div>
               )}
               
               <div className="flex-1 min-w-0">
                  <div className="flex items-center text-blue-100 text-[10px] font-bold tracking-wide mb-1">
                    <Clock size={10} className="mr-1" />
                    {nextStop.time}
                    <span className="mx-2 opacity-50">|</span>
                    <Calendar size={10} className="mr-1" />
                    {nextStop.dayTitle}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white leading-tight mb-1 truncate drop-shadow-sm">
                    {nextStop.location}
                  </h3>
                  
                  <p className="text-xs text-gray-200 line-clamp-1 opacity-90">
                    {nextStop.activity}
                  </p>
               </div>

               <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 mt-2 group-hover:bg-white group-hover:text-blue-900 transition-colors">
                  <Navigation size={14} />
               </div>
            </div>
            
            {/* Glossy shine effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
