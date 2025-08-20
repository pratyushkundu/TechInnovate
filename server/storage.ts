// import { type User, type InsertUser, type Contact, type InsertContact, type ChatSession, type InsertChatSession, type ChatMessage } from "@shared/schema";
// import { randomUUID } from "crypto";

// export interface IStorage {
//   getUser(id: string): Promise<User | undefined>;
//   getUserByUsername(username: string): Promise<User | undefined>;
//   createUser(user: InsertUser): Promise<User>;
  
//   createContact(contact: InsertContact): Promise<Contact>;
//   getContacts(): Promise<Contact[]>;
  
//   getChatSession(sessionId: string): Promise<ChatSession | undefined>;
//   createChatSession(session: InsertChatSession): Promise<ChatSession>;
//   updateChatSession(sessionId: string, messages: ChatMessage[]): Promise<ChatSession>;
// }

// export class MemStorage implements IStorage {
//   private users: Map<string, User>;
//   private contacts: Map<string, Contact>;
//   private chatSessions: Map<string, ChatSession>;

//   constructor() {
//     this.users = new Map();
//     this.contacts = new Map();
//     this.chatSessions = new Map();
//   }

//   async getUser(id: string): Promise<User | undefined> {
//     return this.users.get(id);
//   }

//   async getUserByUsername(username: string): Promise<User | undefined> {
//     return Array.from(this.users.values()).find(
//       (user) => user.username === username,
//     );
//   }

//   async createUser(insertUser: InsertUser): Promise<User> {
//     const id = randomUUID();
//     const user: User = { ...insertUser, id };
//     this.users.set(id, user);
//     return user;
//   }

//   async createContact(insertContact: InsertContact): Promise<Contact> {
//     const id = randomUUID();
//     const contact: Contact = { 
//       ...insertContact, 
//       id, 
//       createdAt: new Date() 
//     };
//     this.contacts.set(id, contact);
//     return contact;
//   }

//   async getContacts(): Promise<Contact[]> {
//     return Array.from(this.contacts.values());
//   }

//   async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
//     return Array.from(this.chatSessions.values()).find(
//       (session) => session.sessionId === sessionId
//     );
//   }

//   async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
//     const id = randomUUID();
//     const session: ChatSession = {
//       ...insertSession,
//       id,
//       messages: insertSession.messages || [],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     this.chatSessions.set(id, session);
//     return session;
//   }

//   async updateChatSession(sessionId: string, messages: ChatMessage[]): Promise<ChatSession> {
//     const session = await this.getChatSession(sessionId);
//     if (!session) {
//       throw new Error('Chat session not found');
//     }
    
//     const updatedSession: ChatSession = {
//       ...session,
//       messages: messages as any,
//       updatedAt: new Date(),
//     };
    
//     this.chatSessions.set(session.id, updatedSession);
//     return updatedSession;
//   }
// }

// export const storage = new MemStorage();


// import { type User, type InsertUser, type Contact, type InsertContact, type ChatSession, type InsertChatSession, type ChatMessage } from "@shared/schema";
// import { randomUUID } from "crypto";

// export interface IStorage {
//   getUser(id: string): Promise<User | undefined>;
//   getUserByUsername(username: string): Promise<User | undefined>;
//   createUser(user: InsertUser): Promise<User>;
  
//   createContact(contact: InsertContact): Promise<Contact>;
//   getContacts(): Promise<Contact[]>;
  
//   getChatSession(sessionId: string): Promise<ChatSession | undefined>;
//   createChatSession(session: InsertChatSession): Promise<ChatSession>;
//   updateChatSession(sessionId: string, messages: ChatMessage[]): Promise<ChatSession>;
// }

// export class MemStorage implements IStorage {
//   private users: Map<string, User>;
//   private contacts: Map<string, Contact>;
//   private chatSessions: Map<string, ChatSession>;

//   constructor() {
//     this.users = new Map();
//     this.contacts = new Map();
//     this.chatSessions = new Map();
//   }

//   async getUser(id: string): Promise<User | undefined> {
//     return this.users.get(id);
//   }

//   async getUserByUsername(username: string): Promise<User | undefined> {
//     return Array.from(this.users.values()).find(
//       (user) => user.username === username,
//     );
//   }

//   async createUser(insertUser: InsertUser): Promise<User> {
//     const id = randomUUID();
//     const user: User = { ...insertUser, id };
//     this.users.set(id, user);
//     return user;
//   }

//   async createContact(insertContact: InsertContact): Promise<Contact> {
//     const id = randomUUID();
//     const contact: Contact = { 
//       ...insertContact, 
//       id, 
//       createdAt: new Date() 
//     };
//     this.contacts.set(id, contact);
//     return contact;
//   }

//   async getContacts(): Promise<Contact[]> {
//     return Array.from(this.contacts.values());
//   }

//   async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
//     return Array.from(this.chatSessions.values()).find(
//       (session) => session.sessionId === sessionId
//     );
//   }

//   async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
//     const id = randomUUID();
//     const session: ChatSession = {
//       ...insertSession,
//       id,
//       messages: insertSession.messages || [],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     this.chatSessions.set(id, session);
//     return session;
//   }

//   async updateChatSession(sessionId: string, messages: ChatMessage[]): Promise<ChatSession> {
//     const session = await this.getChatSession(sessionId);
//     if (!session) {
//       throw new Error('Chat session not found');
//     }
    
//     const updatedSession: ChatSession = {
//       ...session,
//       messages: messages as any,
//       updatedAt: new Date(),
//     };
    
//     this.chatSessions.set(session.id, updatedSession);
//     return updatedSession;
//   }
// }

// export const storage = new MemStorage();



// storage.]ts
import { db } from "./db";
import { users, contacts, chatSessions } from "@shared/schema";
import { type User, type InsertUser, type Contact, type InsertContact, type ChatSession, type InsertChatSession, type ChatMessage } from "@shared/schema";
import { eq } from "drizzle-orm";
import "dotenv/config";  // automatically loads .env

export class PostgresStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(insertContact).returning();
    return result[0];
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    const result = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId));
    return result[0];
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const result = await db.insert(chatSessions).values(insertSession).returning();
    return result[0];
  }

  async updateChatSession(sessionId: string, messages: ChatMessage[]): Promise<ChatSession> {
    const result = await db
      .update(chatSessions)
      .set({ messages, updatedAt: new Date() })
      .where(eq(chatSessions.sessionId, sessionId))
      .returning();
    return result[0];
  }
}

export const storage = new PostgresStorage();
