import React, { useState } from 'react';
import { DropletIcon, TrendingUpIcon, LightbulbIcon, BarChart3Icon } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PredictionBot from './components/PredictionBot';
import SuggestionBot from './components/SuggestionBot';
import Header from './components/Header';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'prediction':
        return <PredictionBot />;
      case 'suggestions':
        return <SuggestionBot />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'bg-white/70 text-blue-700 hover:bg-white/90 hover:shadow-md'
            }`}
          >
            <BarChart3Icon size={20} />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab('prediction')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'prediction'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : 'bg-white/70 text-purple-700 hover:bg-white/90 hover:shadow-md'
            }`}
          >
            <TrendingUpIcon size={20} />
            Usage Prediction
          </button>
          
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'suggestions'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'bg-white/70 text-emerald-700 hover:bg-white/90 hover:shadow-md'
            }`}
          >
            <LightbulbIcon size={20} />
            Save Water
          </button>
        </div>

        {/* Main Content */}
        <div className="animate-in fade-in duration-500">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;