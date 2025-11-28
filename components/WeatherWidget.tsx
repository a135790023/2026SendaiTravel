
import React, { useEffect, useState } from 'react';
import { Cloud, Sun, Snowflake, CloudRain, MapPin, Loader2 } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherWidgetProps {
  variant?: 'default' | 'minimal';
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ variant = 'default' }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string>('定位中...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("不支援定位");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Simple check if roughly in Japan (Lat > 20, Lon > 122) or Taiwan
        if (latitude > 30 && longitude > 128) {
           setLocationName("日本");
        } else {
           setLocationName("台灣");
        }

        try {
          // Using Open-Meteo Free API
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          const data = await response.json();
          setWeather({
            temperature: data.current_weather.temperature,
            weatherCode: data.current_weather.weathercode,
            isDay: data.current_weather.is_day
          });
        } catch (err) {
          setError("無法取得天氣");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLocationName("仙台");
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=38.2682&longitude=140.8694&current_weather=true`)
          .then(res => res.json())
          .then(data => {
             setWeather({
              temperature: data.current_weather.temperature,
              weatherCode: data.current_weather.weathercode,
              isDay: data.current_weather.is_day
            });
            setLoading(false);
          })
          .catch(() => {
             setError("無法取得位置");
             setLoading(false);
          });
      }
    );
  }, []);

  const getWeatherIcon = (code: number) => {
    // In minimal mode (dark bg), icons are white. In default mode (glass card), we keep them colored but lighter for dark theme
    const iconClass = variant === 'minimal' ? "w-6 h-6 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" : "w-8 h-8";
    
    if (code <= 1) return <Sun className={`${iconClass} ${variant === 'default' ? 'text-yellow-300' : ''}`} />;
    if (code <= 3) return <Cloud className={`${iconClass} ${variant === 'default' ? 'text-gray-300' : ''}`} />;
    if (code <= 67) return <CloudRain className={`${iconClass} ${variant === 'default' ? 'text-blue-300' : ''}`} />;
    if (code >= 71) return <Snowflake className={`${iconClass} ${variant === 'default' ? 'text-cyan-200' : ''}`} />;
    return <Cloud className={`${iconClass} ${variant === 'default' ? 'text-gray-300' : ''}`} />;
  };

  if (error) return null;

  if (variant === 'minimal') {
    return (
      <div className="flex flex-col items-end text-white animate-fade-in">
        <div className="flex items-center space-x-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin text-white/70" /> : (weather && getWeatherIcon(weather.weatherCode))}
          <span className="text-2xl font-light tracking-tighter drop-shadow-md">
            {loading ? '--' : weather?.temperature}°
          </span>
        </div>
        <div className="flex items-center text-[10px] font-medium opacity-80 mt-0.5">
          <MapPin className="w-3 h-3 mr-0.5" />
          {locationName}
        </div>
      </div>
    );
  }

  // Default Card Style (Dark Mode Glass)
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/10 flex items-center justify-between">
      <div>
        <div className="flex items-center text-xs text-gray-400 mb-1">
          <MapPin className="w-3 h-3 mr-1" />
          {locationName}
        </div>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
            <span className="text-sm text-gray-400">載入天氣...</span>
          </div>
        ) : (
          <div className="flex items-baseline text-white">
             <span className="text-3xl font-light tracking-tighter">
               {weather?.temperature}<span className="text-lg text-gray-400">°C</span>
             </span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        {!loading && weather && getWeatherIcon(weather.weatherCode)}
        {!loading && weather && (
           <span className="text-xs text-gray-400 mt-1">
             {weather.weatherCode >= 71 ? "下雪" : weather.weatherCode > 3 ? "有雨" : "晴時多雲"}
           </span>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;