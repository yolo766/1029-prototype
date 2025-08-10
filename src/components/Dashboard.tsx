import React from 'react';
import { DropletIcon, TrendingDownIcon, TrendingUpIcon, AlertTriangleIcon, CheckCircleIcon, BotIcon, LightbulbIcon, ArrowRightIcon, SparklesIcon } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      label: 'Today\'s Usage',
      value: '84L',
      change: '-12%',
      trend: 'down',
      icon: DropletIcon,
      color: 'blue'
    },
    {
      label: 'This Week',
      value: '627L',
      change: '+5%',
      trend: 'up',
      icon: TrendingUpIcon,
      color: 'purple'
    },
    {
      label: 'Monthly Average',
      value: '2.4kL',
      change: '-8%',
      trend: 'down',
      icon: TrendingDownIcon,
      color: 'emerald'
    },
    {
      label: 'Efficiency Score',
      value: '87%',
      change: '+3%',
      trend: 'up',
      icon: CheckCircleIcon,
      color: 'amber'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      message: 'Higher than usual morning usage detected',
      time: '2 hours ago'
    },
    {
      type: 'success',
      message: 'You saved 15L compared to last week!',
      time: '1 day ago'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-full">
              <SparklesIcon size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome to AquaSmart</h1>
              <p className="text-xl text-blue-100">Your intelligent water management companion</p>
            </div>
          </div>
          
          <p className="text-lg text-blue-50 mb-8 max-w-3xl">
            Discover how AI can transform your water usage with smart predictions and personalized conservation tips. 
            Get started with our two intelligent assistants designed to help you save water and reduce costs.
          </p>
        </div>
      </div>

      {/* AI Bots Introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Prediction Bot Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <BotIcon className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Usage Prediction AI</h3>
              <p className="text-purple-600 font-medium">Smart Forecasting Assistant</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Predict your water usage for tomorrow, next week, or entire month</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Analyze seasonal patterns and consumption trends</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Get insights on factors affecting your water consumption</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Receive early warnings about unusual usage spikes</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 italic">
              "Ask me anything like: 'How much water will I use next week?' or 'What affects my consumption patterns?'"
            </p>
          </div>
          
          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 group">
            Try Prediction Bot
            <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Conservation Bot Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <LightbulbIcon className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Conservation AI</h3>
              <p className="text-emerald-600 font-medium">Water Saving Advisor</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Get personalized tips to reduce your water consumption</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Learn about water-efficient appliances and fixtures</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Discover drought-resistant plants for your garden</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Identify and fix water waste in your home</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 italic">
              "Ask me: 'How can I save water in the bathroom?' or 'What are the best water-saving plants?'"
            </p>
          </div>
          
          <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center gap-2 group">
            Try Conservation Bot
            <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* How to Use Guide */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">How to Use Your AI Assistants</h2>
          <p className="text-indigo-100">Get the most out of your water management bots</p>
        </div>
        
        <div className="p-8">
          {/* Step-by-step guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prediction Bot Guide */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <BotIcon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Usage Prediction Bot</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Configure Your Household</h4>
                    <p className="text-gray-600 text-sm">Click the settings icon to set up your household size, bedrooms, bathrooms, and features like garden or pool.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Ask Prediction Questions</h4>
                    <p className="text-gray-600 text-sm">Try questions like "How much water will I use next week?" or "What affects my consumption?"</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Get Personalized Insights</h4>
                    <p className="text-gray-600 text-sm">Receive tailored predictions based on your specific household configuration and usage patterns.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-medium text-purple-800 mb-2">Example Questions:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• "Predict my usage for next month"</li>
                  <li>• "How does weather affect my consumption?"</li>
                  <li>• "Show me seasonal patterns"</li>
                  <li>• "What's my daily average usage?"</li>
                </ul>
              </div>
            </div>
            
            {/* Conservation Bot Guide */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <LightbulbIcon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Conservation Bot</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Identify Problem Areas</h4>
                    <p className="text-gray-600 text-sm">Ask about specific areas where you want to save water - bathroom, kitchen, garden, or general usage.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Get Actionable Tips</h4>
                    <p className="text-gray-600 text-sm">Receive specific, practical advice tailored to your situation with estimated savings.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Implement & Track</h4>
                    <p className="text-gray-600 text-sm">Follow the suggestions and ask follow-up questions to optimize your water conservation efforts.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-50 rounded-lg p-4">
                <h5 className="font-medium text-emerald-800 mb-2">Example Questions:</h5>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• "How can I save water in the shower?"</li>
                  <li>• "Best drought-resistant plants?"</li>
                  <li>• "Kitchen water saving tips"</li>
                  <li>• "Fix my high water usage"</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Pro Tips */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <SparklesIcon className="text-blue-600" size={20} />
              Pro Tips for Best Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700 text-sm">Be specific in your questions - mention rooms, appliances, or time periods for better answers</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700 text-sm">Update your household configuration when things change (new appliances, family size, etc.)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700 text-sm">Use both bots together - predict usage first, then ask for conservation tips</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700 text-sm">Ask follow-up questions to dive deeper into specific recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;