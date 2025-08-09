import { 
  type User, 
  type InsertUser, 
  type WaterPrediction, 
  type InsertWaterPrediction,
  type ChatMessage,
  type InsertChatMessage,
  type CommunityStats 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createWaterPrediction(prediction: InsertWaterPrediction): Promise<WaterPrediction>;
  getWaterPredictions(): Promise<WaterPrediction[]>;
  
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(): Promise<ChatMessage[]>;
  
  getCommunityStats(): Promise<CommunityStats>;
  updateCommunityStats(stats: Partial<CommunityStats>): Promise<CommunityStats>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private waterPredictions: Map<string, WaterPrediction>;
  private chatMessages: Map<string, ChatMessage>;
  private communityStats: CommunityStats;

  constructor() {
    this.users = new Map();
    this.waterPredictions = new Map();
    this.chatMessages = new Map();
    this.communityStats = {
      id: randomUUID(),
      waterSaved: 2300000, // 2.3M liters
      treesWatered: 950,
      communityMembers: 12567,
      lastUpdated: new Date(),
    };
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWaterPrediction(insertPrediction: InsertWaterPrediction): Promise<WaterPrediction> {
    const id = randomUUID();
    
    // Calculate predictions based on inputs
    const baseUsagePerPerson = 120; // liters per day
    let dailyUsage = insertPrediction.householdSize * baseUsagePerPerson;
    
    // Adjust for season
    const seasonMultipliers = {
      winter: 0.8,
      spring: 0.9,
      summer: 1.3,
      monsoon: 1.1,
    };
    dailyUsage *= seasonMultipliers[insertPrediction.season as keyof typeof seasonMultipliers] || 1;
    
    // Adjust for habits
    const habits = insertPrediction.habits as string[];
    if (habits.includes('garden')) dailyUsage += 50;
    if (habits.includes('car-wash')) dailyUsage += 200;
    if (habits.includes('swimming')) dailyUsage += 300;
    if (habits.includes('long-showers')) dailyUsage += 100;
    
    const potentialSavings = Math.round(dailyUsage * 0.25); // 25% savings potential
    const environmentalImpact = Math.round((dailyUsage * 7) / 1000 * 3.2); // trees watered per week equivalent
    
    const prediction: WaterPrediction = {
      ...insertPrediction,
      id,
      dailyUsage: Math.round(dailyUsage),
      potentialSavings,
      environmentalImpact,
      createdAt: new Date(),
    };
    
    this.waterPredictions.set(id, prediction);
    
    // Update community stats
    this.communityStats.waterSaved += potentialSavings;
    this.communityStats.treesWatered += Math.round(environmentalImpact / 7);
    this.communityStats.communityMembers += 1;
    this.communityStats.lastUpdated = new Date();
    
    return prediction;
  }

  async getWaterPredictions(): Promise<WaterPrediction[]> {
    return Array.from(this.waterPredictions.values());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    
    // AI response generation based on message content
    const message = insertMessage.message.toLowerCase();
    let response = "I'm here to help you save water! Could you please be more specific about what you'd like to know?";
    
    if (message.includes('shower') || message.includes('bath')) {
      response = "Great question about shower water usage! Here are some effective tips: 1) Take shorter showers (aim for 4-5 minutes), 2) Install a low-flow showerhead which can save 25-60% of water, 3) Turn off water while soaping, 4) Consider a shower timer. These changes can save up to 25 gallons per week!";
    } else if (message.includes('leak') || message.includes('drip')) {
      response = "Leaks are a major cause of water waste! A single dripping faucet can waste over 3,000 gallons per year. Check faucets, toilets, and pipes regularly. For toilet leaks, add food coloring to the tank - if color appears in the bowl without flushing, you have a leak. Fix leaks immediately to prevent waste.";
    } else if (message.includes('garden') || message.includes('plant') || message.includes('irrigation')) {
      response = "Smart gardening saves significant water! Use drip irrigation or soaker hoses (50% more efficient than sprinklers), water early morning or evening to reduce evaporation, choose native drought-resistant plants, mulch around plants to retain moisture, and collect rainwater for irrigation. These methods can reduce garden water usage by 30-50%.";
    } else if (message.includes('kitchen') || message.includes('dish') || message.includes('cooking')) {
      response = "Kitchen water conservation tips: Run dishwashers only when full (saves 25 gallons per load), scrape plates instead of pre-rinsing, use a basin for washing dishes by hand, keep drinking water in the fridge instead of running tap water, and fix any leaky faucets immediately.";
    } else if (message.includes('toilet') || message.includes('flush')) {
      response = "Toilet water-saving strategies: Install a low-flow toilet (saves 13,000+ gallons annually), place a water-filled bottle in older toilet tanks to reduce flush volume, don't use toilet as a wastebasket, and check for leaks regularly. Consider dual-flush toilets for maximum efficiency.";
    } else if (message.includes('laundry') || message.includes('washing')) {
      response = "Laundry water conservation: Only run full loads (saves 25 gallons per load), use cold water when possible (90% of energy goes to heating water), choose efficient washing machines, and reuse lightly soiled towels. High-efficiency machines use 40% less water than standard models.";
    } else if (message.includes('rain') || message.includes('harvest')) {
      response = "Rainwater harvesting is excellent for conservation! Install gutters and downspouts to direct water to collection barrels, use collected water for gardening and outdoor cleaning, ensure proper filtration for potable use, and check local regulations. A 1000 sq ft roof can collect 600+ gallons from 1 inch of rain!";
    } else if (message.includes('save money') || message.includes('bill') || message.includes('cost')) {
      response = "Water conservation saves money! The average family can save $380 annually by installing water-efficient fixtures. Low-flow showerheads ($10-40) can save $70/year, fixing leaks saves $35/year per drip, and efficient toilets save $140/year. Small investments yield significant long-term savings.";
    }
    
    const chatMessage: ChatMessage = {
      id,
      message: insertMessage.message,
      response,
      timestamp: new Date(),
    };
    
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).sort(
      (a, b) => (a.timestamp?.getTime() || 0) - (b.timestamp?.getTime() || 0)
    );
  }

  async getCommunityStats(): Promise<CommunityStats> {
    return this.communityStats;
  }

  async updateCommunityStats(stats: Partial<CommunityStats>): Promise<CommunityStats> {
    this.communityStats = { ...this.communityStats, ...stats, lastUpdated: new Date() };
    return this.communityStats;
  }
}

export const storage = new MemStorage();
