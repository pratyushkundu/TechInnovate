import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { developers, insertContactSchema, insertDeveloperSchema, type ChatMessage } from "@shared/schema";
import { generateChatResponse, generateProjectSuggestions } from "./services/openai";
import { randomUUID } from "crypto";
import { sendContactNotification, sendDeveloperNotification } from "./services/email";
import { DateTime } from "luxon";
import * as chrono from "chrono-node";

import { db } from "./db"
// import { upload } from "./middleware/upload";

import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import path from "path";


import { fileURLToPath } from "url";
import { dirname } from "path";

import { google } from "googleapis";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer for memory storage (we upload buffer directly to Supabase)
const upload = multer({ storage: multer.memoryStorage() });

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);



const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : "",
  scopes: ["https://www.googleapis.com/auth/calendar"]
});

const calendar = google.calendar({ version: "v3", auth });

calendar.acl.insert({
  calendarId: "primary",
  requestBody: {
    role: "owner", // or "writer"
    scope: {
      type: "user",
      value: "pratyushkundu123@gmail.com", // your Gmail
    },
  },
});

function isWithinAllowedTime(date: string, time: string): boolean {
  const startDateTime = new Date(`${date}T${time}:00`);
  // Convert to IST and extract hours
  const hoursIST = new Date(
    startDateTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  ).getHours();

  return hoursIST >= 15 && hoursIST <= 23;
}







// // Map country to IANA timezone
// const countryToZone: Record<string, string> = {
//   India: "Asia/Kolkata",
//   Germany: "Europe/Berlin",
//   USA: "America/New_York",
//   UK: "Europe/London",
//   // add more as needed
// };

// export function convertToIST(userInput: string, userCountry?: string): string | null {
//   try {
//     // Detect timezone from country
//     const zone = userCountry ? countryToZone[userCountry] || "UTC" : "UTC";

//     let dt: DateTime | null = null;

//     // 1. Try to parse ISO directly
//     const isoParsed = DateTime.fromISO(userInput, { zone });
//     if (isoParsed.isValid) {
//       dt = isoParsed;
//     }

//     // 2. If not valid ISO, try natural language parsing (chrono-node)
//     if (!dt) {
//       const parsed = chrono.parseDate(userInput, new Date(), { forwardDate: true });
//       if (parsed) {
//         dt = DateTime.fromJSDate(parsed, { zone });
//       }
//     }

//     if (!dt || !dt.isValid) {
//       console.warn("[convertToIST] Could not parse date:", userInput);
//       return null;
//     }

//     // Convert to IST
//     const istTime = dt.setZone("Asia/Kolkata");
//     return istTime.toISO({ suppressMilliseconds: true, suppressSeconds: true });
//   } catch (err) {
//     console.error("[convertToIST] Error parsing date:", err);
//     return null;
//   }
// }

// Add common tz abbreviations → IANA zones
const tzAbbrevMap: Record<string, string> = {
  UTC: "UTC", GMT: "UTC",
  IST: "Asia/Kolkata",
  CEST: "Europe/Berlin", CET: "Europe/Berlin",
  BST: "Europe/London",
  EDT: "America/New_York", EST: "America/New_York",
  PDT: "America/Los_Angeles", PST: "America/Los_Angeles",
};

const countryToZone: Record<string, string> = {
  India: "Asia/Kolkata",
  Germany: "Europe/Berlin",
  USA: "America/New_York",
  UK: "Europe/London",
  // ...
};

// Optional: sniff a timezone hint from the assistant's visible text
function detectTzHintFromText(text: string): string | undefined {
  const m = text.match(/\b(UTC|GMT|IST|CEST|CET|BST|EDT|EST|PDT|PST)\b/i);
  return m ? tzAbbrevMap[m[1].toUpperCase()] : undefined;
}

export function convertToIST(
  userInput: string,                 // "2025-08-31T13:00" or "today 5pm" etc.
  userCountry?: string,              // e.g., "Germany"
  tzHintText?: string                // optional full AI response text for sniffing tz words
): string | null {
  try {
    // 0) If userInput is ISO with offset/Z, parse as absolute and convert.
    const looksOffset = /[zZ]|[+\-]\d{2}:?\d{2}$/.test(userInput);
    if (looksOffset) {
      const abs = DateTime.fromISO(userInput);
      if (!abs.isValid) return null;
      return abs.setZone("Asia/Kolkata").toISO({ suppressMilliseconds: true, suppressSeconds: true });
    }

    // 1) Otherwise, choose a source zone:
    //    a) explicit tz hint (e.g., "UTC", "CEST") in the text
    const tzFromText = tzHintText ? detectTzHintFromText(tzHintText) : undefined;
    //    b) user's country zone
    const zone =
      tzFromText ||
      (userCountry ? countryToZone[userCountry] : undefined) ||
      "UTC";

    let dt: DateTime | null = null;

    // 2) Try ISO-without-offset in the chosen zone
    const isoLocal = DateTime.fromISO(userInput, { zone });
    if (isoLocal.isValid) dt = isoLocal;

    // 3) If not ISO, parse natural language (chrono) relative to the chosen zone
    if (!dt) {
      const ref = DateTime.now().setZone(zone).toJSDate();
      const parsed = chrono.parseDate(userInput, ref, { forwardDate: true });
      if (parsed) dt = DateTime.fromJSDate(parsed, { zone });
    }

    if (!dt || !dt.isValid) return null;

    // 4) Convert to IST output
    return dt.setZone("Asia/Kolkata").toISO({ suppressMilliseconds: true, suppressSeconds: true });
  } catch (err) {
    console.error("[convertToIST] Error:", err);
    return null;
  }
}

// // ---------------- JSON Extraction Helper ----------------
// function extractJsonFromResponse(response: string) {
//   // Match the FIRST complete JSON object { ... }
//   const jsonMatch = response.match(/\{[\s\S]*?\}/);
//   if (jsonMatch) {
//     let jsonString = jsonMatch[0];

//     try {
//       // 🔹 Cleanup common AI formatting issues
//       jsonString = jsonString
//         .replace(/\\_/g, "_")   // remove \_ (escaped underscores)
//         .replace(/“|”/g, '"')   // replace fancy quotes
//         .replace(/'/g, '"')     // replace single quotes with double quotes
//         .trim();

//       // ✅ Strict parse now works
//       return JSON.parse(jsonString);
//     } catch (err) {
//       console.error("[ERROR] Failed to parse JSON block:", err);
//       console.error("Raw JSON:", jsonString);
//     }
//   }

//   return null;
// }

// ---------------- JSON Extraction Helper ----------------
export function extractJsonFromResponse(response: string) {
  if (!response || typeof response !== "string") return null;

  try {
    // 🔹 Match the FIRST valid JSON object (handles nested braces safely)
    const stack: number[] = [];
    let startIndex = -1;
    let endIndex = -1;

    for (let i = 0; i < response.length; i++) {
      if (response[i] === "{") {
        if (stack.length === 0) startIndex = i;
        stack.push(i);
      } else if (response[i] === "}") {
        stack.pop();
        if (stack.length === 0) {
          endIndex = i;
          break;
        }
      }
    }

    if (startIndex === -1 || endIndex === -1) return null;

    let jsonString = response.substring(startIndex, endIndex + 1);

    // 🔹 Normalize common AI formatting issues
    jsonString = jsonString
      .replace(/\\n/g, "")        // remove escaped newlines
      .replace(/\\t/g, " ")       // replace tabs with space
      .replace(/\\_/g, "_")       // cleanup escaped underscores
      .replace(/“|”/g, '"')       // fancy quotes → normal quotes
      .replace(/‘|’/g, '"')       // single fancy quotes → double quotes
      .replace(/'/g, '"')         // single → double quotes
      .replace(/,\s*}/g, "}")     // remove trailing commas before }
      .replace(/,\s*]/g, "]")     // remove trailing commas before ]
      .trim();

    // ✅ Parse safely
    return JSON.parse(jsonString);

  } catch (err) {
    console.error("[ERROR] Failed to extract/parse JSON:", err);
    console.error("Response snippet:", response.slice(0, 200));
    return null;
  }
}


// Helper to create event
async function createGoogleCalendarEvent(contact: any) {
  try {
    // Ensure appointmentDate & appointmentTime are available
    const startDateTime = new Date(`${contact.appointmentDate}T${contact.appointmentTime}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // +1 hour

    const event = {
      summary: `Meeting with ${contact.firstName} ${contact.lastName} for project discussion`,
      description: `
        📝 Project Type: ${contact.projectType}
        💰 Budget: ${contact.budget}
        📧 Email: ${contact.email}
        📞 Phone: ${contact.phone || "Not provided"}
        🗒️ Description: ${contact.description || "No description"}
      `,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      // attendees: [
      //   { email: contact.email }, // user
      //   { email: process.env.GOOGLE_CLIENT_EMAIL }, // owner/service account
      // ],
    };

    const response = await calendar.events.insert({
      calendarId: "primary", // or a shared calendar ID
      requestBody: event,
      sendUpdates: "all",
    });

    return response.data;
  } catch (err) {
    console.error("Google Calendar error:", err);
    return null;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact/client", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);

      // Generate AI suggestions for the project
      const suggestions = await generateProjectSuggestions(validatedData.description);

      // Google Calendar
      const calendarEvent = await createGoogleCalendarEvent(contact);

      const emailSent = await sendContactNotification(contact);
      res.json({
        success: true,
        contact,
        emailSent,
        suggestions,
        calendarEvent, // 👉 return event details
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({
        success: false,
        message: "Failed to submit contact form"
      });
    }
  });



  // 📌 Developer Contact Form
  // app.post("/api/contact/developer", async (req, res) => {
  //   try {
  //     const validatedData = insertDeveloperSchema.parse(req.body);
  //     const developer = await storage.createDeveloperContact(validatedData);


  //     const suggestions = await generateProjectSuggestions(validatedData.proposalDescription);
  //     const emailSent = await sendDeveloperNotification(developer)

  //     res.json({
  //       success: true,
  //       developer,
  //       emailSent,
  //       suggestions,
  //     });
  //   } catch (error) {
  //     console.error("Developer Contact form error:", error);
  //     res.status(400).json({
  //       success: false,
  //       message: "Failed to submit developer contact form",
  //     });
  //   }
  // });

  // app.post("/api/contact/developer", upload.single("resume"), async (req, res) => {
  //   try {
  //     const {
  //       firstName,
  //       lastName,
  //       email,
  //       phoneNo,
  //       experience,
  //       expertise,
  //       proposalDescription,
  //       projectApplicationFor,
  //     } = req.body;

  //     if (!req.file) {
  //       return res.status(400).json({ success: false, message: "Resume file is required" });
  //     }

  //     // Save developer in DB
  //     const [developer] = await db
  //       .insert(developers)
  //       .values({
  //         firstName,
  //         lastName,
  //         email,
  //         phoneNo,
  //         experience,
  //         expertise,
  //         proposalDescription,
  //         resume: req.file?.filename, // store file path
  //         projectApplicationFor,
  //       })
  //       .returning();


  //     // const validatedData = insertDeveloperSchema.parse(req.body);

  //     // if (req.file) {
  //     //   validatedData.resume = req.file?.filename; // save file path into DB
  //     // }

  //     // Step 3: Save to DB
  //     // const developer = await storage.createDeveloperContact(validatedData);

  //     // Step 4: Generate AI project suggestions
  //     // const suggestions = await generateProjectSuggestions(validatedData.proposalDescription);

  //     // Step 5: Send notification email
  //     const emailSent = await sendDeveloperNotification(developer);

  //     res.json({
  //       success: true,
  //       developer,
  //       emailSent,
  //       message: "Developer form submitted successfully",
  //     });
  //   } catch (error) {
  //     console.error("Developer Contact form error:", error);
  //     res.status(400).json({
  //       success: false,
  //       message: "Failed to submit developer contact form",
  //     });
  //   }
  // });


  app.post("/api/contact/developer", upload.single("resume"), async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNo,
        experience,
        expertise,
        proposalDescription,
        projectApplicationFor,
        biddingBudget
      } = req.body;

      if (!req.file) {
        return res.status(400).json({ success: false, message: "Resume file is required" });
      }

      // ✅ Sanitize filename to avoid Supabase errors
      const safeFileName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const fileName = `resumes/${Date.now()}_${safeFileName}`;

      // Upload resume to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("resumes") // bucket name must exist
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });


      if (uploadError) throw uploadError;

      // Get public URL of resume
      const { data: publicUrlData } = supabase.storage
        .from("resumes")
        .getPublicUrl(fileName);

      const resumeUrl = publicUrlData.publicUrl;

      // Save developer record in DB with Supabase file name (or URL)
      const [developer] = await db
        .insert(developers)
        .values({
          firstName,
          lastName,
          email,
          phoneNo,
          experience,
          expertise,
          proposalDescription,
          resume: resumeUrl, // ✅ store Supabase path instead of local filename
          projectApplicationFor,
          biddingBudget
        })
        .returning();

      // Send email notification (your email.ts will build resumeUrl using BASE_URL)
      const emailSent = await sendDeveloperNotification({
        ...developer,
        resume: resumeUrl, // important so your email.ts can construct correct URL
      });

      res.json({
        success: true,
        developer,
        emailSent,
        message: "Developer form submitted successfully",
        resumeUrl, // send public URL back to frontend
      });
    } catch (error) {
      console.error("Developer Contact form error:", error);
      res.status(400).json({
        success: false,
        message: "Failed to submit developer contact form",
      });
    }
  });


  // Get all contacts (for admin purposes)
  app.get("/api/contacts/client", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Chat endpoints
  // app.post("/api/chat/message", async (req, res) => {
  //   try {
  //     const { message, sessionId } = req.body;

  //     if (!message || typeof message !== 'string') {
  //       return res.status(400).json({ message: "Message is required" });
  //     }

  //     let currentSessionId = sessionId;
  //     let chatSession;

  //     // Get or create chat session
  //     if (currentSessionId) {
  //       chatSession = await storage.getChatSession(currentSessionId);
  //     }

  //     if (!chatSession) {
  //       currentSessionId = randomUUID();
  //       chatSession = await storage.createChatSession({
  //         sessionId: currentSessionId,
  //         messages: [],
  //       });
  //     }

  //     // Prepare messages for OpenAI
  //     const existingMessages = (chatSession.messages as ChatMessage[]) || [];
  //     const userMessage: ChatMessage = {
  //       id: randomUUID(),
  //       role: 'user',
  //       content: message,
  //       timestamp: new Date().toISOString(),
  //     };

  //     const messagesForAI = existingMessages.map(msg => ({
  //       role: msg.role as 'user' | 'assistant' | 'system',
  //       content: msg.content
  //     }));
  //     messagesForAI.push({ role: 'user', content: message });

  //     // Generate AI response
  //     const aiResponse = await generateChatResponse(messagesForAI);

  //     // <------------- new code  -------------------->

  //     console.log("AI Response:", aiResponse);  
  //     let finalResponse = aiResponse; // default
  //     let bookingData = null;

  //   try {
  //     const parsed = JSON.parse(aiResponse);
  //     if (parsed.schedule_meeting) {
  //       bookingData = parsed;
  //       console.log("[INFO] Booking data detected:", bookingData);
  //     } else {
  //       console.log("[INFO] No booking request in AI response");
  //     }
  //   } catch (e) {
  //     console.warn("[WARN] AI response is not valid JSON. Skipping booking parse.");
  //   }

  //     if (bookingData) {
  //       const istTime = convertToIST(bookingData.time, bookingData.country);
  //       if (istTime) {
  //         const start = DateTime.fromFormat(istTime, "yyyy-MM-dd HH:mm", { zone: "Asia/Kolkata" }).toISO();
  //         const end = start ? DateTime.fromISO(start).plus({ hours: 1 }).toISO() : null;

  //         // Google Calendar
  //         // build contact object for createGoogleCalendarEvent
  //         const contact = {
  //           firstName: bookingData.firstName || "Guest",
  //           lastName: bookingData.lastName || "",
  //           projectType: bookingData.projectType || "General Meeting",
  //           budget: bookingData.budget || "N/A",
  //           email: req.body.userEmail || "pratyushkundu123@gmail.com", // 👈 fallback to your email
  //           phone: bookingData.phone || "",
  //           description: bookingData.description || "",
  //           appointmentDate: start ? start.split("T")[0] : "",
  //           appointmentTime: start ? start.split("T")[1].slice(0, 5) : "", // HH:mm
  //         };

  //         const calendarEvent = await createGoogleCalendarEvent(contact);
  //         console.log("Google Calendar event created:", calendarEvent);

  //         finalResponse = `✅ Meeting scheduled at ${istTime} IST. You’ll receive a calendar invite shortly.`;
  //       } else {
  //         finalResponse = "I couldn’t understand the time provided. Please try again in format YYYY-MM-DDTHH:mm.";
  //       }
  //     }

  //     const assistantMessage: ChatMessage = {
  //       id: randomUUID(),
  //       role: 'assistant',
  //       content: aiResponse,
  //       timestamp: new Date().toISOString(),
  //     };

  //     // Update chat session with new messages
  //     const updatedMessages = [...existingMessages, userMessage, assistantMessage];
  //     await storage.updateChatSession(currentSessionId, updatedMessages);

  //     res.json({
  //       response: aiResponse,
  //       sessionId: currentSessionId,
  //       messages: updatedMessages,
  //     });
  //   } catch (error) {
  //     console.error("Chat message error:", error);
  //     res.status(500).json({
  //       message: "Failed to process chat message"
  //     });
  //   }
  // });
  // Chat endpoints


  // ---------------- Route ----------------
  app.post("/api/chat/message", async (req, res) => {
    try {
      const { message, sessionId } = req.body;

      if (!message || typeof message !== "string") {
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
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      };

      const messagesForAI = existingMessages.map((msg) => ({
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content,
      }));
      messagesForAI.push({ role: "user", content: message });

      // Generate AI response
      const aiResponse = await generateChatResponse(messagesForAI);

      console.log("AI Response:", aiResponse);

      let finalResponse = aiResponse; // default
      let bookingData: any = null;

      // ✅ Use helper function
      bookingData = extractJsonFromResponse(aiResponse);

      // if (bookingData && bookingData.schedule_meeting) {
      //   console.log("[INFO] Booking data detected:", bookingData);

      //   const istTime = convertToIST(bookingData.time, bookingData.country);
      //   if (istTime) {
      //     const start = DateTime.fromFormat(istTime, "yyyy-MM-dd HH:mm", {
      //       zone: "Asia/Kolkata",
      //     }).toISO();
      //     const end = start
      //       ? DateTime.fromISO(start).plus({ hours: 1 }).toISO()
      //       : null;

      //     const contact = {
      //       firstName: bookingData.firstName || "Guest",
      //       lastName: bookingData.lastName || "",
      //       projectType: bookingData.projectType || "General Meeting",
      //       budget: bookingData.budget || "N/A",
      //       email: req.body.userEmail || "pratyushkundu123@gmail.com",
      //       phone: bookingData.phone || "",
      //       description: bookingData.description || "",
      //       appointmentDate: start ? start.split("T")[0] : "",
      //       appointmentTime: start ? start.split("T")[1].slice(0, 5) : "",
      //     };

      //     const calendarEvent = await createGoogleCalendarEvent(contact);
      //     console.log("Google Calendar event created:", calendarEvent);

      //     finalResponse = `✅ Meeting scheduled at ${istTime} IST. You’ll receive a calendar invite shortly.`;
      //   } else {
      //     finalResponse =
      //       "I couldn’t understand the time provided. Please try again in format YYYY-MM-DDTHH:mm.";
      //   }
      // } else {
      //   console.log("[INFO] No booking request in AI response");
      // }
      if (bookingData && bookingData.schedule_meeting) {
        console.log("[INFO] Booking data detected:", bookingData);

        // Check required fields before scheduling
        if (bookingData.time && bookingData.country && bookingData.firstName && bookingData.email) {
          const istTime = convertToIST(bookingData.time, bookingData.country, aiResponse);

          if (istTime) {
            const start = DateTime.fromISO(istTime).toISO();
            const end = start ? DateTime.fromISO(start).plus({ hours: 1 }).toISO() : null;

            const contact = {
              firstName: bookingData.firstName || "Guest",
              lastName: bookingData.lastName || "",
              projectType: bookingData.projectType || "General Meeting",
              budget: bookingData.budget || "N/A",
              email: bookingData.email || "default@hukitola.com",
              phone: bookingData.phone || "",
              description: bookingData.description || "",
              appointmentDate: start ? start.split("T")[0] : "",
              appointmentTime: start ? start.split("T")[1].slice(0, 5) : "",
            };

            const calendarEvent = await createGoogleCalendarEvent(contact);
            console.log("Google Calendar event created:", calendarEvent);

            finalResponse = `✅ Meeting scheduled at ${istTime} IST. You’ll receive a calendar invite shortly.`;
          } else {
            finalResponse =
              "I couldn’t understand the time provided. Please try again in format YYYY-MM-DDTHH:mm.";
          }
        } else {
          console.log("[INFO] Booking data incomplete. Waiting for user to provide missing fields.");
          // Just return AI response without forcing scheduling yet
          finalResponse = aiResponse;
        }
      } else {
        console.log("[INFO] No booking request in AI response");
      }

      const assistantMessage: ChatMessage = {
        id: randomUUID(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...existingMessages, userMessage, assistantMessage];
      await storage.updateChatSession(currentSessionId, updatedMessages);

      res.json({
        response: finalResponse,
        sessionId: currentSessionId,
        messages: updatedMessages,
      });
    } catch (error) {
      console.error("Chat message error:", error);
      res.status(500).json({
        message: "Failed to process chat message",
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


  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml"); // ✅ ensures Content-Type
    res.sendFile(path.join(__dirname, "../client/public/sitemap.xml"));
  });


  const httpServer = createServer(app);
  return httpServer;
}
