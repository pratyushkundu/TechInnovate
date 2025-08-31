// import { sql } from "drizzle-orm";
// import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
// import { createInsertSchema } from "drizzle-zod";
// import { z } from "zod";

// export const users = pgTable("users", {
//   id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
//   username: text("username").notNull().unique(),
//   password: text("password").notNull(),
//   createdAt: timestamp("created_at").defaultNow(),
// });

// export const contacts = pgTable("contacts", {
//   id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
//   firstName: text("first_name").notNull(),
//   lastName: text("last_name").notNull(),
//   email: text("email").notNull(),
//   projectType: text("project_type").notNull(),
//   budget: text("budget").notNull(),
//   description: text("description").notNull(),
//   createdAt: timestamp("created_at").defaultNow(),
// });

// export const chatSessions = pgTable("chat_sessions", {
//   id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
//   sessionId: text("session_id").notNull(),
//   messages: jsonb("messages").notNull().default('[]'),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });

// export const insertUserSchema = createInsertSchema(users).pick({
//   username: true,
//   password: true,
// });

// export const insertContactSchema = createInsertSchema(contacts).omit({
//   id: true,
//   createdAt: true,
// });

// export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
//   id: true,
//   createdAt: true,
//   updatedAt: true,
// });

// export type InsertUser = z.infer<typeof insertUserSchema>;
// export type User = typeof users.$inferSelect;

// export type InsertContact = z.infer<typeof insertContactSchema>;
// export type Contact = typeof contacts.$inferSelect;

// export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
// export type ChatSession = typeof chatSessions.$inferSelect;

// export interface ChatMessage {
//   id: string;
//   role: 'user' | 'assistant';
//   content: string;
//   timestamp: string;
// }


import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  // createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  budget: text("budget").notNull(),
  description: text("description").notNull(),
    appointmentDate: text("appointment_date").notNull(), // ISO date string
  appointmentTime: text("appointment_time").notNull(), // e.g. "14:30"
  createdAt: timestamp("created_at").defaultNow(),

});

export const developers = pgTable("developers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phoneNo: text("phone_no").notNull(),
  projectApplicationFor: text("project_application_for").notNull(),
  experience: text("experience").notNull(),
  expertise: text("expertise").notNull(),
  // resume: text("resume").notNull(), // tus upload url
   resume: text("resume").notNull(),
  proposalDescription: text("proposal_description").notNull(),
  biddingBudget: text("bidding_budget"),
  createdAt: timestamp("created_at").defaultNow(),
});



export const chatSessions = pgTable("chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  messages: jsonb("messages").notNull().default('[]'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertDeveloperSchema = createInsertSchema(developers).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertDeveloper = z.infer<typeof insertDeveloperSchema>;
export type Developer = typeof developers.$inferSelect;

export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}