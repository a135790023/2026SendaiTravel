import React, { useEffect, useState } from 'react';
import { TRIP_START_DATE } from '../constants';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number}>({ days: 0, hours: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(TRIP_START_DATE) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg mb-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-xl"></div>
      <h2 className="text-sm font-medium opacity-90 mb-2 uppercase tracking-wider">距離仙台之旅</h2>
      <div className="flex items-baseline space-x-1">
        <span className="text-5xl font-bold">{timeLeft.days}</span>
        <span className="text-lg opacity-80 mr-4">天</span>
        <span className="text-2xl font-semibold">{timeLeft.hours}</span>
        <span className="text-sm opacity-80">小時</span>
      </div>
      <div className="mt-4 text-xs font-mono bg-white/20 inline-block px-2 py-1 rounded">
        2026.01.02 - 01.07
      </div>
    </div>
  );
};

export default Countdown;
