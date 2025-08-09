import { useState } from "react";

interface IndiaMapProps {
  selectedCity?: string;
  onCitySelect: (city: string) => void;
}

const cities = [
  { id: "delhi", name: "Delhi", x: 120, y: 180 },
  { id: "mumbai", name: "Mumbai", x: 80, y: 280 },
  { id: "bangalore", name: "Bangalore", x: 280, y: 380 },
  { id: "chennai", name: "Chennai", x: 320, y: 420 },
  { id: "kolkata", name: "Kolkata", x: 250, y: 200 },
  { id: "hyderabad", name: "Hyderabad", x: 200, y: 300 },
  { id: "pune", name: "Pune", x: 150, y: 260 },
];

export default function IndiaMap({ selectedCity, onCitySelect }: IndiaMapProps) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <div className="glass-effect rounded-2xl p-6" data-testid="india-map-container">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Select City on Map</h3>
      <div className="bg-white/20 rounded-xl p-4 h-96 flex items-center justify-center">
        <svg 
          viewBox="0 0 400 500" 
          className="w-full h-full cursor-pointer" 
          aria-label="Interactive map of India"
          data-testid="india-map-svg"
        >
          {/* Map outline (simplified India shape) */}
          <path 
            d="M100 50 L300 50 L350 100 L380 200 L370 300 L350 400 L300 450 L200 470 L100 450 L50 400 L30 300 L40 200 L70 100 Z" 
            fill="#e0f2fe" 
            stroke="#0ea5e9" 
            strokeWidth="2" 
            className="hover:fill-blue-100 transition-colors duration-200"
          />
          
          {/* City markers */}
          <g data-testid="city-markers">
            {cities.map((city) => (
              <g key={city.id}>
                <circle 
                  cx={city.x} 
                  cy={city.y} 
                  r={selectedCity === city.id ? 10 : 8}
                  fill={selectedCity === city.id ? "#22c55e" : "#ef4444"}
                  className="cursor-pointer transition-all duration-200 hover:r-10"
                  onClick={() => onCitySelect(city.id)}
                  onMouseEnter={() => setHoveredCity(city.id)}
                  onMouseLeave={() => setHoveredCity(null)}
                  aria-label={city.name}
                  data-testid={`city-marker-${city.id}`}
                />
                {(hoveredCity === city.id || selectedCity === city.id) && (
                  <text
                    x={city.x}
                    y={city.y - 15}
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-800 pointer-events-none"
                    data-testid={`city-label-${city.id}`}
                  >
                    {city.name}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Click on any city to select it for predictions
      </p>
    </div>
  );
}
