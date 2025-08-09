export interface PredictionInput {
  city: string;
  householdSize: number;
  season: string;
  habits: string[];
}

export interface PredictionOutput {
  dailyUsage: number;
  potentialSavings: number;
  environmentalImpact: number;
  recommendations: string[];
}

// City-specific base water consumption data (liters per person per day)
const cityBaseConsumption: Record<string, number> = {
  mumbai: 135,
  delhi: 150,
  bangalore: 125,
  chennai: 110,
  kolkata: 120,
  hyderabad: 130,
  pune: 140,
};

// Seasonal multipliers
const seasonMultipliers: Record<string, number> = {
  winter: 0.8,
  spring: 0.9,
  summer: 1.3,
  monsoon: 1.1,
};

// Habit-based additional consumption (liters per day)
const habitConsumption: Record<string, number> = {
  garden: 50,
  "car-wash": 200,
  swimming: 300,
  "long-showers": 100,
};

export function calculateWaterPrediction(input: PredictionInput): PredictionOutput {
  const baseConsumption = cityBaseConsumption[input.city] || 120;
  let dailyUsage = input.householdSize * baseConsumption;
  
  // Apply seasonal adjustment
  const seasonMultiplier = seasonMultipliers[input.season] || 1;
  dailyUsage *= seasonMultiplier;
  
  // Add habit-based consumption
  input.habits.forEach(habit => {
    dailyUsage += habitConsumption[habit] || 0;
  });
  
  const potentialSavings = Math.round(dailyUsage * 0.25); // 25% potential savings
  const environmentalImpact = Math.round((dailyUsage * 7) / 1000 * 3.2); // trees watered per week
  
  const recommendations = generateRecommendations(input);
  
  return {
    dailyUsage: Math.round(dailyUsage),
    potentialSavings,
    environmentalImpact,
    recommendations,
  };
}

function generateRecommendations(input: PredictionInput): string[] {
  const recommendations: string[] = [];
  
  if (input.habits.includes("long-showers")) {
    recommendations.push("Install low-flow showerheads and reduce shower time to 5 minutes");
  }
  
  if (input.habits.includes("garden")) {
    recommendations.push("Use drip irrigation and water plants early morning or evening");
  }
  
  if (input.habits.includes("car-wash")) {
    recommendations.push("Use a bucket instead of hose for car washing");
  }
  
  if (input.season === "summer") {
    recommendations.push("Collect and store water during monsoon season");
  }
  
  if (input.householdSize >= 4) {
    recommendations.push("Install water-efficient appliances for your large household");
  }
  
  // City-specific recommendations
  if (["chennai", "bangalore"].includes(input.city)) {
    recommendations.push("Consider rainwater harvesting system for your region");
  }
  
  if (recommendations.length === 0) {
    recommendations.push("Install water-efficient fixtures throughout your home");
  }
  
  return recommendations;
}
