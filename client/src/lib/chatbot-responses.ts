export interface ChatResponse {
  keywords: string[];
  response: string;
}

export const chatResponses: ChatResponse[] = [
  {
    keywords: ["shower", "bath", "bathing"],
    response: "Great question about shower water usage! Here are some effective tips: 1) Take shorter showers (aim for 4-5 minutes), 2) Install a low-flow showerhead which can save 25-60% of water, 3) Turn off water while soaping, 4) Consider a shower timer. These changes can save up to 25 gallons per week!"
  },
  {
    keywords: ["leak", "drip", "leaking", "dripping"],
    response: "Leaks are a major cause of water waste! A single dripping faucet can waste over 3,000 gallons per year. Check faucets, toilets, and pipes regularly. For toilet leaks, add food coloring to the tank - if color appears in the bowl without flushing, you have a leak. Fix leaks immediately to prevent waste."
  },
  {
    keywords: ["garden", "plant", "irrigation", "watering"],
    response: "Smart gardening saves significant water! Use drip irrigation or soaker hoses (50% more efficient than sprinklers), water early morning or evening to reduce evaporation, choose native drought-resistant plants, mulch around plants to retain moisture, and collect rainwater for irrigation. These methods can reduce garden water usage by 30-50%."
  },
  {
    keywords: ["kitchen", "dish", "cooking", "washing dishes"],
    response: "Kitchen water conservation tips: Run dishwashers only when full (saves 25 gallons per load), scrape plates instead of pre-rinsing, use a basin for washing dishes by hand, keep drinking water in the fridge instead of running tap water, and fix any leaky faucets immediately."
  },
  {
    keywords: ["toilet", "flush", "bathroom"],
    response: "Toilet water-saving strategies: Install a low-flow toilet (saves 13,000+ gallons annually), place a water-filled bottle in older toilet tanks to reduce flush volume, don't use toilet as a wastebasket, and check for leaks regularly. Consider dual-flush toilets for maximum efficiency."
  },
  {
    keywords: ["laundry", "washing machine", "clothes"],
    response: "Laundry water conservation: Only run full loads (saves 25 gallons per load), use cold water when possible (90% of energy goes to heating water), choose efficient washing machines, and reuse lightly soiled towels. High-efficiency machines use 40% less water than standard models."
  },
  {
    keywords: ["rain", "harvest", "collection", "rainwater"],
    response: "Rainwater harvesting is excellent for conservation! Install gutters and downspouts to direct water to collection barrels, use collected water for gardening and outdoor cleaning, ensure proper filtration for potable use, and check local regulations. A 1000 sq ft roof can collect 600+ gallons from 1 inch of rain!"
  },
  {
    keywords: ["money", "bill", "cost", "save", "savings"],
    response: "Water conservation saves money! The average family can save $380 annually by installing water-efficient fixtures. Low-flow showerheads ($10-40) can save $70/year, fixing leaks saves $35/year per drip, and efficient toilets save $140/year. Small investments yield significant long-term savings."
  },
  {
    keywords: ["tips", "advice", "help", "conservation"],
    response: "Here are my top water conservation tips: 1) Fix leaks immediately, 2) Take shorter showers, 3) Run full loads in dishwasher/washing machine, 4) Use native plants in landscaping, 5) Install efficient fixtures, 6) Collect rainwater, 7) Turn off tap while brushing teeth. What specific area would you like to focus on?"
  }
];

export function generateChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  for (const response of chatResponses) {
    if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return response.response;
    }
  }
  
  return "I'm here to help you save water! Could you please be more specific about what you'd like to know? You can ask me about shower tips, fixing leaks, garden irrigation, kitchen conservation, toilet efficiency, laundry savings, rainwater harvesting, or cost savings.";
}
