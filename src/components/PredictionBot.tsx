import React, { useState } from 'react';
import { SendIcon, BotIcon, UserIcon, TrendingUpIcon, CalendarIcon, DropletIcon, HomeIcon, UsersIcon, MapPinIcon, SettingsIcon } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface HouseholdConfig {
  size: number;
  bedrooms: number;
  bathrooms: number;
  hasGarden: boolean;
  hasPool: boolean;
  location: string;
  appliances: string[];
}
const PredictionBot: React.FC = () => {
  const [householdConfig, setHouseholdConfig] = useState<HouseholdConfig>({
    size: 2,
    bedrooms: 2,
    bathrooms: 1,
    hasGarden: false,
    hasPool: false,
    location: 'suburban',
    appliances: ['dishwasher']
  });
  const [showConfig, setShowConfig] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your water usage prediction assistant. I can help you forecast your water consumption based on your household setup, patterns, weather, and activities. First, let me know about your household configuration for more accurate predictions. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedQuestions = [
    "Predict my water usage for next week",
    "How much water will I use this month?",
    "What factors affect my consumption?",
    "Show seasonal usage patterns"
  ];

  const generatePersonalizedResponse = (userMessage: string): string => {
    const { size, bedrooms, bathrooms, hasGarden, hasPool, location, appliances } = householdConfig;
    const baseUsage = size * 50; // Base 50L per person per day
    const gardenUsage = hasGarden ? size * 20 : 0;
    const poolUsage = hasPool ? 100 : 0;
    const applianceUsage = appliances.length * 15;
    
    const dailyEstimate = baseUsage + gardenUsage + poolUsage + applianceUsage;
    const weeklyEstimate = dailyEstimate * 7;
    const monthlyEstimate = dailyEstimate * 30;

    return { dailyEstimate, weeklyEstimate, monthlyEstimate };
  };
  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const estimates = generatePersonalizedResponse(message);
    
    if (message.includes('next week') || message.includes('week')) {
      return `Based on your ${householdConfig.size}-person household with ${householdConfig.bedrooms} bedrooms and ${householdConfig.bathrooms} bathroom(s), I predict you'll use approximately ${estimates.weeklyEstimate-50}-${estimates.weeklyEstimate+50} liters next week.\n\n📊 **Personalized Breakdown:**\n• Daily average: ${Math.round(estimates.dailyEstimate)}L\n• Household base: ${householdConfig.size * 50}L/day\n${householdConfig.hasGarden ? `• Garden usage: ${householdConfig.size * 20}L/day\n` : ''}${householdConfig.hasPool ? '• Pool maintenance: 100L/day\n' : ''}• Appliances: ${householdConfig.appliances.length * 15}L/day\n\n**Weather impact**: Cooler temperatures may reduce usage by 8-12%`;
    } else if (message.includes('month') || message.includes('monthly')) {
      return `Your projected monthly usage is ${(estimates.monthlyEstimate/1000).toFixed(1)}-${((estimates.monthlyEstimate+200)/1000).toFixed(1)} kL for your ${householdConfig.size}-person ${householdConfig.location} household.\n\n🏠 **Your Configuration Impact:**\n• Base consumption: ${((householdConfig.size * 50 * 30)/1000).toFixed(1)} kL\n• Bathrooms (${householdConfig.bathrooms}): +${(householdConfig.bathrooms * 200/1000).toFixed(1)} kL\n${householdConfig.hasGarden ? `• Garden: +${(householdConfig.size * 20 * 30/1000).toFixed(1)} kL\n` : ''}${householdConfig.hasPool ? '• Pool: +3.0 kL\n' : ''}• Appliances: +${(householdConfig.appliances.length * 15 * 30/1000).toFixed(1)} kL\n\n**Optimization tip**: Your ${householdConfig.location} location suggests potential for rainwater harvesting!`;
    } else if (message.includes('factors') || message.includes('affect')) {
      return `Your water usage is influenced by several key factors based on your household setup:\n\n👥 **Household size (${householdConfig.size} people)**: Base factor - ${householdConfig.size * 50}L/day\n🏠 **Property type**: ${householdConfig.bedrooms}-bedroom ${householdConfig.location} home\n🚿 **Bathrooms (${householdConfig.bathrooms})**: Major usage points\n${householdConfig.hasGarden ? '🌱 **Garden**: Seasonal variation 20-40L/day per person\n' : ''}${householdConfig.hasPool ? '🏊 **Pool**: Consistent 100L/day for maintenance\n' : ''}🔧 **Appliances**: ${householdConfig.appliances.join(', ')} add ${householdConfig.appliances.length * 15}L/day\n🌡️ **Weather**: Can increase usage by 25-30% in summer\n\n**Your biggest impact factors**: ${householdConfig.hasPool ? 'Pool maintenance' : householdConfig.hasGarden ? 'Garden watering' : 'Household activities'}`;
    } else if (message.includes('season') || message.includes('pattern')) {
      const winterUsage = (estimates.dailyEstimate - (householdConfig.hasGarden ? householdConfig.size * 15 : 0)) * 30 / 1000;
      const summerUsage = (estimates.dailyEstimate + (householdConfig.hasGarden ? householdConfig.size * 25 : 0) + (householdConfig.hasPool ? 50 : 0)) * 30 / 1000;
      return `Your seasonal patterns for a ${householdConfig.size}-person household:\n\n🌸 **Spring**: ${(winterUsage + 0.3).toFixed(1)} kL/month (garden preparation)\n☀️ **Summer**: ${summerUsage.toFixed(1)} kL/month (peak usage${householdConfig.hasGarden ? ', garden watering' : ''}${householdConfig.hasPool ? ', pool use' : ''})\n🍂 **Autumn**: ${(estimates.monthlyEstimate/1000).toFixed(1)} kL/month (moderate usage)\n❄️ **Winter**: ${winterUsage.toFixed(1)} kL/month (minimal outdoor use)\n\n**Your variation**: ${Math.round(((summerUsage - winterUsage) / winterUsage) * 100)}% increase in summer. ${householdConfig.hasGarden ? 'Consider drought-resistant plants!' : 'Your indoor usage is quite consistent.'}`;
    } else {
      return `I'm analyzing your question for your ${householdConfig.size}-person household... Based on your configuration (${householdConfig.bedrooms} bedrooms, ${householdConfig.bathrooms} bathroom(s)${householdConfig.hasGarden ? ', garden' : ''}${householdConfig.hasPool ? ', pool' : ''}), I can provide personalized insights about future consumption, identify trends, and suggest optimal usage strategies. Could you be more specific about what time period or aspect you'd like me to focus on?`;
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const updateHouseholdConfig = (key: keyof HouseholdConfig, value: any) => {
    setHouseholdConfig(prev => ({ ...prev, [key]: value }));
  };

  const toggleAppliance = (appliance: string) => {
    setHouseholdConfig(prev => ({
      ...prev,
      appliances: prev.appliances.includes(appliance)
        ? prev.appliances.filter(a => a !== appliance)
        : [...prev.appliances, appliance]
    }));
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full">
              <BotIcon className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Usage Prediction AI</h2>
              <p className="text-purple-100">Smart forecasting for better water management</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <SettingsIcon className="text-white" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Household Configuration */}
        {showConfig && (
          <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-white/20">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <HomeIcon size={20} />
              Household Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <UsersIcon size={16} className="inline mr-1" />
                  Household Size
                </label>
                <select
                  value={householdConfig.size}
                  onChange={(e) => updateHouseholdConfig('size', parseInt(e.target.value))}
                  className="w-full p-2 bg-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  value={householdConfig.bedrooms}
                  onChange={(e) => updateHouseholdConfig('bedrooms', parseInt(e.target.value))}
                  className="w-full p-2 bg-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <select
                  value={householdConfig.bathrooms}
                  onChange={(e) => updateHouseholdConfig('bathrooms', parseInt(e.target.value))}
                  className="w-full p-2 bg-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPinIcon size={16} className="inline mr-1" />
                  Location Type
                </label>
                <select
                  value={householdConfig.location}
                  onChange={(e) => updateHouseholdConfig('location', e.target.value)}
                  className="w-full p-2 bg-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="urban">Urban</option>
                  <option value="suburban">Suburban</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={householdConfig.hasGarden}
                    onChange={(e) => updateHouseholdConfig('hasGarden', e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Garden</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={householdConfig.hasPool}
                    onChange={(e) => updateHouseholdConfig('hasPool', e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Pool</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appliances</label>
                <div className="flex flex-wrap gap-2">
                  {['dishwasher', 'washing machine', 'dryer', 'hot tub'].map(appliance => (
                    <button
                      key={appliance}
                      onClick={() => toggleAppliance(appliance)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                        householdConfig.appliances.includes(appliance)
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/70 text-gray-700 hover:bg-purple-100'
                      }`}
                    >
                      {appliance}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Quick Predictions Panel */}
        <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-white/20">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Predictions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="text-purple-600" size={16} />
                <span className="font-medium text-gray-700">Tomorrow</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{Math.round((householdConfig.size * 50) + (householdConfig.hasGarden ? householdConfig.size * 20 : 0) + (householdConfig.hasPool ? 100 : 0) + (householdConfig.appliances.length * 15) + 10)}L</div>
              <div className="text-sm text-gray-600">+8% from today</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUpIcon className="text-blue-600" size={16} />
                <span className="font-medium text-gray-700">This Week</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{Math.round(((householdConfig.size * 50) + (householdConfig.hasGarden ? householdConfig.size * 20 : 0) + (householdConfig.hasPool ? 100 : 0) + (householdConfig.appliances.length * 15)) * 7)}L</div>
              <div className="text-sm text-gray-600">Within target range</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DropletIcon className="text-emerald-600" size={16} />
                <span className="font-medium text-gray-700">Month End</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">{(((householdConfig.size * 50) + (householdConfig.hasGarden ? householdConfig.size * 20 : 0) + (householdConfig.hasPool ? 100 : 0) + (householdConfig.appliances.length * 15)) * 30 / 1000).toFixed(1)}kL</div>
              <div className="text-sm text-gray-600">Slightly above average</div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`p-2 rounded-full ${
                message.sender === 'user' ? 'bg-purple-100' : 'bg-blue-100'
              }`}>
                {message.sender === 'user' ? (
                  <UserIcon className="text-purple-600" size={16} />
                ) : (
                  <BotIcon className="text-blue-600" size={16} />
                )}
              </div>
              <div
                className={`max-w-md p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white ml-auto'
                    : 'bg-white/70 text-gray-800'
                } shadow-sm`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <BotIcon className="text-blue-600" size={16} />
              </div>
              <div className="bg-white/70 text-gray-800 p-4 rounded-2xl shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <div className="p-4 border-t border-white/20">
          <div className="flex flex-wrap gap-2 mb-4">
            {predefinedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="px-3 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Ask about your water usage predictions..."
              className="flex-1 px-4 py-3 bg-white/70 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionBot;