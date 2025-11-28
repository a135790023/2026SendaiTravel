
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
      try {
        // Robust split for time ranges: 11:50–16:00 (en-dash) or 11:50-16:00 (hyphen)
        const startTime = timeStr.split(/[–-]/)[0].trim(); 
        const [year, month, day] = dateStr.split('/').map(Number);
        const [hours, minutes] = startTime.split(':').map(Number);
        
        // Validation check
        if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hours) || isNaN(minutes)) {
           return new Date(8640000000000000); // Return max date to avoid selecting invalid items
        }
        
        return new Date(year, month - 1, day, hours, minutes);
      } catch (e) {
        return new Date(8640000000000000);
      }
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
  const bgImage = "https://images.pexels.com/photos/5500779/pexels-photo-5500779.jpeg";

  return (
    // h-[100dvh] ensures full viewport height on mobile browsers including Safari
    <div className="relative h-[100dvh] w-full overflow-hidden bg-gray-900 overscroll-none touch-none">
      {/* 1. Full Screen Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* 2. Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

      {/* 3. Content Layer - Flex Layout for Space Distribution */}
      <div className="relative z-10 flex flex-col h-full pt-safe-top pb-24 px-6 animate-fade-in justify-between">
        
        {/* Top Section: Date & Weather */}
        <div className="flex justify-between items-start mt-4 flex-shrink-0">
          <div className="text-white drop-shadow-md">
            <h1 className="text-2xl font-bold tracking-tight mb-1">Sendai Trip</h1>
            <p className="text-sm font-medium opacity-90 uppercase tracking-widest">{today}</p>
          </div>
          <WeatherWidget variant="minimal" />
        </div>

        {/* Middle Section: Countdown (Centered vertically in remaining space) */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-center text-white drop-shadow-lg transform -translate-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 opacity-80">Time Until Departure</p>
            <div className="flex items-baseline justify-center space-x-4">
              <div className="flex flex-col items-center">
                 <span className="text-7xl md:text-8xl font-thin tracking-tighter">{timeLeft.days}</span>
                 <span className="text-xs font-medium uppercase mt-2 opacity-80">Days</span>
              </div>
              <span className="text-5xl font-thin opacity-50 pb-8">:</span>
              <div className="flex flex-col items-center">
                 <span className="text-7xl md:text-8xl font-thin tracking-tighter">{timeLeft.hours}</span>
                 <span className="text-xs font-medium uppercase mt-2 opacity-80">Hours</span>
              </div>
            </div>
            <div className="mt-8 inline-flex items-center px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm shadow-lg">
               <span className="text-[10px] font-mono tracking-wider">2026.01.02 — 01.07</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Travelers & Next Stop (Grouped tightly at bottom) */}
        <div className="flex flex-col w-full flex-shrink-0 space-y-4">
          
          {/* Travelers List */}
          <div className="w-full">
             <div className="flex items-center justify-center mb-2 opacity-70 space-x-2">
                <div className="h-[1px] w-8 bg-white/50"></div>
                <Users size={12} className="text-white" />
                <span className="text-[10px] font-medium text-white uppercase tracking-widest">Travel Members</span>
                <div className="h-[1px] w-8 bg-white/50"></div>
             </div>
             
             {/* Horizontal Scroll Container */}
             <div className="relative w-full">
                <div className="flex overflow-x-auto no-scrollbar space-x-3 px-4 pb-2 justify-start md:justify-center">
                  {TRAVELERS.map((name, index) => (
                    <div 
                      key={name}
                      className="flex-shrink-0 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-medium tracking-wide shadow-lg hover:bg-white/20 transition-all duration-300 select-none"
                    >
                      {name}
                    </div>
                  ))}
                </div>
                {/* Fade masks */}
                <div className="absolute left-0 top-0 bottom-2 w-4 bg-gradient-to-r from-black/20 to-transparent pointer-events-none md:hidden"></div>
                <div className="absolute right-0 top-0 bottom-2 w-4 bg-gradient-to-l from-black/20 to-transparent pointer-events-none md:hidden"></div>
             </div>
          </div>

          {/* Next Stop Glass Card */}
          <div 
            onClick={() => setTab('itinerary')}
            className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl transition-all active:scale-[0.98] w-full"
          >
            <div className="p-4 flex items-start space-x-4">
              {/* Thumbnail Image */}
              {nextStop.image && (
                <div className="h-14 w-14 rounded-xl overflow-hidden shadow-lg flex-shrink-0 border border-white/10">
                  <img src={nextStop.image} alt="Location" className="h-full w-full object-cover" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center text-blue-100 text-[10px] font-bold tracking-wide">
                      <Clock size={10} className="mr-1" />
                      {nextStop.time}
                      <span className="mx-2 opacity-50">|</span>
                      <Calendar size={10} className="mr-1" />
                      {nextStop.dayTitle}
                    </div>
                    <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest animate-pulse">Next Stop</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white leading-tight mb-0.5 truncate drop-shadow-sm">
                    {nextStop.location}
                  </h3>
                  
                  <p className="text-[10px] text-gray-200 line-clamp-1 opacity-90">
                    {nextStop.activity}
                  </p>
              </div>

              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 self-center group-hover:bg-white group-hover:text-blue-900 transition-colors">
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
