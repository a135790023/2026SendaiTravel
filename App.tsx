
import React, { useState } from 'react';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import PackingList from './pages/PackingList';
import Tools from './pages/Tools';
import { Home as HomeIcon, Map, Briefcase, Calculator } from 'lucide-react';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home setTab={setActiveTab} />;
      case 'itinerary': return <Itinerary />;
      case 'packing': return <PackingList />;
      case 'tools': return <Tools />;
      default: return <Home setTab={setActiveTab} />;
    }
  };

  return (
    <div className="bg-ios-bg min-h-screen font-sans text-gray-900 overflow-hidden relative">
      <main className="h-screen overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {renderContent()}
        </div>
      </main>

      {/* Bottom Navigation - High Quality Glassmorphism */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/20 backdrop-blur-2xl border-t border-white/30 pb-safe-area pt-2 px-2 flex justify-around items-center z-50 h-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] ring-1 ring-white/20">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center space-y-1 w-16 h-full transition-all duration-300 ${activeTab === 'home' ? 'text-blue-600 scale-105' : 'text-gray-500/80 hover:text-gray-700'}`}
        >
          <div className={`p-1 rounded-full ${activeTab === 'home' ? 'bg-white/20 shadow-inner' : ''}`}>
             <HomeIcon size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-medium tracking-wide">首頁</span>
        </button>

        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex flex-col items-center justify-center space-y-1 w-16 h-full transition-all duration-300 ${activeTab === 'itinerary' ? 'text-blue-600 scale-105' : 'text-gray-500/80 hover:text-gray-700'}`}
        >
          <div className={`p-1 rounded-full ${activeTab === 'itinerary' ? 'bg-white/20 shadow-inner' : ''}`}>
            <Map size={22} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-medium tracking-wide">行程</span>
        </button>

        <button
          onClick={() => setActiveTab('packing')}
          className={`flex flex-col items-center justify-center space-y-1 w-16 h-full transition-all duration-300 ${activeTab === 'packing' ? 'text-blue-600 scale-105' : 'text-gray-500/80 hover:text-gray-700'}`}
        >
          <div className={`p-1 rounded-full ${activeTab === 'packing' ? 'bg-white/20 shadow-inner' : ''}`}>
            <Briefcase size={22} strokeWidth={activeTab === 'packing' ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-medium tracking-wide">行李</span>
        </button>

        <button
          onClick={() => setActiveTab('tools')}
          className={`flex flex-col items-center justify-center space-y-1 w-16 h-full transition-all duration-300 ${activeTab === 'tools' ? 'text-blue-600 scale-105' : 'text-gray-500/80 hover:text-gray-700'}`}
        >
          <div className={`p-1 rounded-full ${activeTab === 'tools' ? 'bg-white/20 shadow-inner' : ''}`}>
            <Calculator size={22} strokeWidth={activeTab === 'tools' ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-medium tracking-wide">工具</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
