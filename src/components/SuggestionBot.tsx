import React, { useState } from 'react';
import { SendIcon, BotIcon, UserIcon, LightbulbIcon, LeafIcon, HomeIcon, DropletIcon } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SuggestionBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your water conservation advisor. I analyze your usage patterns and provide personalized tips to help you save water and reduce costs. I can suggest improvements for your home, garden, and daily habits. How can I help you save water today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickTips = [
    {
      icon: DropletIcon,
      title: "Fix that dripping tap",
      description: "Could save 20L per day",
      impact: "high"
    },
    {
      icon: HomeIcon,
      title: "Shorter showers",
      description: "Reduce by 2 minutes daily",
      impact: "medium"
    },
    {
      icon: LeafIcon,
      title: "Water-wise plants",
      description: "Switch to drought-resistant varieties",
      impact: "high"
    }
  ];

  const predefinedQuestions = [
    "How can I reduce my shower water usage?",
    "Best plants for water conservation?",
    "Kitchen water saving tips",
    "Fix my high water usage"
  ];

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('shower') || message.includes('bathroom')) {
      return "Great question! Here are my top shower water-saving tips:\n\n🚿 **Install a low-flow showerhead**: Save 25-60L per shower\n⏱️ **Limit showers to 4-5 minutes**: Use a timer or waterproof speaker\n🧴 **Turn off while soaping**: Can save 20L per shower\n💧 **Collect cold water**: Use it for plants while waiting for hot water\n\n**Your potential savings**: ~150L per week (based on your usage patterns)\n**Cost savings**: $2-3 per week on your water bill";
    } else if (message.includes('plant') || message.includes('garden')) {
      return "Excellent choice for water conservation! Here are drought-resistant plants perfect for your climate:\n\n🌿 **Native options**:\n• Kangaroo Paw (beautiful flowers, 70% less water)\n• Bottlebrush (attracts birds, very hardy)\n• Lavender (fragrant, drought-tolerant)\n\n🏡 **Landscaping tips**:\n• Group plants by water needs\n• Mulch heavily to retain moisture\n• Install drip irrigation (50% more efficient)\n\n**Your potential savings**: 200-300L per week during summer months!";
    } else if (message.includes('kitchen') || message.includes('cooking')) {
      return "Smart kitchen habits can save significant water! Here's what I recommend:\n\n🍽️ **Dishwashing**:\n• Run full dishwasher loads only\n• Scrape, don't pre-rinse dishes\n• Use eco-mode (saves 15-20L per load)\n\n🥕 **Food prep**:\n• Wash vegetables in a bowl, not running water\n• Steam vegetables instead of boiling\n• Reuse pasta/vegetable water for plants\n\n**Your potential**: 40-60L savings per week\n**Pro tip**: Based on your usage, Tuesday evenings show highest kitchen water use - great day to implement these changes!";
    } else if (message.includes('high') || message.includes('usage') || message.includes('fix')) {
      return "I've analyzed your usage patterns and found key areas for improvement:\n\n🔍 **Main issues identified**:\n• Morning peak (7-9 AM): 25% above average\n• Weekend spikes: Saturday usage 30% higher\n• Possible leak: Consistent 2L/hour overnight flow\n\n⚡ **Immediate actions**:\n1. Check for leaks (especially toilet and outdoor taps)\n2. Reduce morning shower time by 2 minutes\n3. Fix weekend garden watering schedule\n\n**Expected results**: 20-25% reduction in monthly usage\n**Priority**: Address the potential leak first - it could be costing you 1,500L monthly!";
    } else {
      return "I'm here to help you save water! I can provide personalized advice on:\n\n💧 Reducing household usage\n🌱 Water-efficient gardening\n🔧 Fixing leaks and maintenance\n📊 Optimizing your daily routines\n\nWhat specific area would you like to focus on? I can also analyze your current usage patterns to identify the biggest savings opportunities.";
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
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full">
              <LightbulbIcon className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Water Conservation AI</h2>
              <p className="text-emerald-100">Personalized tips to save water and money</p>
            </div>
          </div>
        </div>

        {/* Quick Tips Panel */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-white/20">
          <h3 className="font-semibold text-gray-800 mb-4">Top Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="bg-white/70 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`${tip.impact === 'high' ? 'text-emerald-600' : 'text-blue-600'}`} size={20} />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tip.impact === 'high' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {tip.impact} impact
                    </span>
                  </div>
                  <div className="font-medium text-gray-800 mb-1">{tip.title}</div>
                  <div className="text-sm text-gray-600">{tip.description}</div>
                </div>
              );
            })}
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
                message.sender === 'user' ? 'bg-emerald-100' : 'bg-teal-100'
              }`}>
                {message.sender === 'user' ? (
                  <UserIcon className="text-emerald-600" size={16} />
                ) : (
                  <LightbulbIcon className="text-teal-600" size={16} />
                )}
              </div>
              <div
                className={`max-w-md p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-emerald-600 text-white ml-auto'
                    : 'bg-white/70 text-gray-800'
                } shadow-sm`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-emerald-200' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-teal-100">
                <LightbulbIcon className="text-teal-600" size={16} />
              </div>
              <div className="bg-white/70 text-gray-800 p-4 rounded-2xl shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm hover:bg-emerald-200 transition-colors duration-200"
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
              placeholder="Ask for water conservation tips..."
              className="flex-1 px-4 py-3 bg-white/70 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionBot;