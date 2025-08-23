import OpenAI from "openai";
import 'dotenv/config';  // shorthand way


// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function generateChatResponse(messages: ChatMessage[]): Promise<string> {
  try {
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are an AI assistant for Hukitola Solutions, a premier IT & technology services company. 
      You help potential clients learn about our services including:
      - Web Development (React, Next.js, Node.js)
      - Cloud Solutions (AWS, Azure, GCP)
      - AI Integration & Automation
      - Mobile Development (iOS, Android, React Native)
      - Cybersecurity services
      - 24/7 Support and Maintenance
      
      Our pricing starts at $2,999 for starter projects, $7,999 for professional projects, and custom pricing for enterprise solutions.
      
      Be helpful, professional, and focus on understanding the client's needs. If they ask about specific technical details or want to start a project, encourage them to use the contact form or schedule a consultation.
      
      Keep responses concise but informative. Use a friendly, professional tone.`
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I apologize, but I'm having trouble processing your request right now. Please try again or contact our support team directly.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "I'm currently experiencing technical difficulties. Please contact our support team directly for immediate assistance.";
  }
}

export async function generateProjectSuggestions(projectDescription: string): Promise<{
  suggestions: string[],
  estimatedBudget: string,
  timeline: string
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: 'system',
          content: `You are a technical consultant for Hukitola Solutions. Based on a project description, provide:
          1. 3-5 specific technical suggestions or features
          2. An estimated budget range (Starter: $2,999-$9,999, Professional: $10,000-$49,999, Enterprise: $50,000+)
          3. An estimated timeline in weeks
          
          Respond in JSON format with keys: suggestions (array of strings), estimatedBudget (string), timeline (string)`
        },
        {
          role: 'user',
          content: projectDescription
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      suggestions: result.suggestions || ['Custom solution tailored to your needs'],
      estimatedBudget: result.estimatedBudget || 'Contact us for pricing',
      timeline: result.timeline || '4-8 weeks'
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      suggestions: ['Custom solution tailored to your needs'],
      estimatedBudget: 'Contact us for pricing',
      timeline: '4-8 weeks'
    };
  }
}
