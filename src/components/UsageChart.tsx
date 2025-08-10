import React from 'react';

const UsageChart: React.FC = () => {
  const chartData = [
    { day: 'Mon', usage: 85 },
    { day: 'Tue', usage: 92 },
    { day: 'Wed', usage: 78 },
    { day: 'Thu', usage: 88 },
    { day: 'Fri', usage: 95 },
    { day: 'Sat', usage: 102 },
    { day: 'Sun', usage: 84 }
  ];

  const maxUsage = Math.max(...chartData.map(d => d.usage));

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Weekly Usage Pattern</h4>
      <div className="flex items-end justify-between h-48 bg-gray-50/50 rounded-lg p-4">
        {chartData.map((data, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="relative flex items-end h-32">
              <div
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md w-8 transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                style={{ height: `${(data.usage / maxUsage) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm font-medium text-gray-600">{data.day}</div>
            <div className="text-xs text-blue-600 font-semibold">{data.usage}L</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsageChart;