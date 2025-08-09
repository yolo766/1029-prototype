import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const waterPredictions = pgTable("water_predictions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  city: text("city").notNull(),
  householdSize: integer("household_size").notNull(),
  season: text("season").notNull(),
  habits: jsonb("habits").notNull(),
  dailyUsage: integer("daily_usage").notNull(),
  potentialSavings: integer("potential_savings").notNull(),
  environmentalImpact: integer("environmental_impact").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  response: text("response").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const communityStats = pgTable("community_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  waterSaved: integer("water_saved").notNull().default(0),
  treesWatered: integer("trees_watered").notNull().default(0),
  communityMembers: integer("community_members").notNull().default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaterPredictionSchema = createInsertSchema(waterPredictions).omit({
  id: true,
  dailyUsage: true,
  potentialSavings: true,
  environmentalImpact: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  response: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type WaterPrediction = typeof waterPredictions.$inferSelect;
export type InsertWaterPrediction = z.infer<typeof insertWaterPredictionSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type CommunityStats = typeof communityStats.$inferSelect;
