import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, type ChatMessage } from "@shared/schema";
import { generateChatResponse, generateProjectSuggestions } from "./services/openai";
import { randomUUID } from "crypto";
import { sendContactNotification } from "./services/email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Generate AI suggestions for the project
      const suggestions = await generateProjectSuggestions(validatedData.description);
      
       const emailSent = await sendContactNotification(contact);

      res.json({ 
        success: true, 
        contact,
        emailSent,
        suggestions 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to submit contact form" 
      });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Chat endpoints
  app.post("/api/chat/message", async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: "Message is required" });
      }

      let currentSessionId = sessionId;
      let chatSession;

      // Get or create chat session
      if (currentSessionId) {
        chatSession = await storage.getChatSession(currentSessionId);
      }

      if (!chatSession) {
        currentSessionId = randomUUID();
        chatSession = await storage.createChatSession({
          sessionId: currentSessionId,
          messages: [],
        });
      }

      // Prepare messages for OpenAI
      const existingMessages = (chatSession.messages as ChatMessage[]) || [];
      const userMessage: ChatMessage = {
        id: randomUUID(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };

      const messagesForAI = existingMessages.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      }));
      messagesForAI.push({ role: 'user', content: message });

      // Generate AI response
      const aiResponse = await generateChatResponse(messagesForAI);
      
      const assistantMessage: ChatMessage = {
        id: randomUUID(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      // Update chat session with new messages
      const updatedMessages = [...existingMessages, userMessage, assistantMessage];
      await storage.updateChatSession(currentSessionId, updatedMessages);

      res.json({
        response: aiResponse,
        sessionId: currentSessionId,
        messages: updatedMessages
      });
    } catch (error) {
      console.error("Chat message error:", error);
      res.status(500).json({ 
        message: "Failed to process chat message" 
      });
    }
  });

  // Get chat session
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const chatSession = await storage.getChatSession(sessionId);
      
      if (!chatSession) {
        return res.status(404).json({ message: "Chat session not found" });
      }

      res.json(chatSession);
    } catch (error) {
      console.error("Get chat session error:", error);
      res.status(500).json({ message: "Failed to fetch chat session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
