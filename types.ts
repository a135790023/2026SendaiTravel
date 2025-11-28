
export interface ItineraryItem {
  time: string;
  location: string;
  activity: string;
  isTransport?: boolean;
  coordinates?: { lat: number; lng: number };
  query?: string;
  image?: string; // URL for the location image
}

export interface DaySchedule {
  date: string; // YYYY/MM/DD
  dayOfWeek: string;
  title: string;
  items: ItineraryItem[];
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  isDay: number;
}

export type Tab = 'home' | 'itinerary' | 'packing' | 'tools';

export interface PackingItem {
  id: string;
  category: string;
  text: string;
  completed: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}