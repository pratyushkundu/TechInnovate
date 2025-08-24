import OpenAI from "openai";
import 'dotenv/config';  // shorthand way


// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key",
  baseURL: "https://openrouter.ai/api/v1",
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function generateChatResponse(messages: ChatMessage[]): Promise<string> {
  try {
    // const systemMessage: ChatMessage = {
    //   role: 'system',
    //   content: `You are an AI assistant for Hukitola Solutions, a premier IT & technology services company. 
    //   You help potential clients learn about our services including:
    //   - Web Development (React, Next.js, Node.js)
    //   - Cloud Solutions (AWS, Azure, GCP)
    //   - AI Integration & Automation
    //   - Mobile Development (iOS, Android, React Native)
    //   - Cybersecurity services
    //   - 24/7 Support and Maintenance

    //   Our pricing starts at $2,999 for starter projects, $7,999 for professional projects, and custom pricing for enterprise solutions.

    //   Be helpful, professional, and focus on understanding the client's needs. If they ask about specific technical details or want to start a project, encourage them to use the contact form or schedule a consultation.

    //   Keep responses concise but informative. Use a friendly, professional tone.`
    // };
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are an AI assistant for Hukitola Solutions, a premier IT & technology services company. 

      ✅ Knowledge Base (use this context to answer user questions):

      - Services:
        * Web Development: React, Next.js, Node.js, Angular
        * E-Commerce: Shopify, WooCommerce, WordPress
        * Backend Development: SQL, PHP, Java (Spring Boot), Python (Django/Flask)
        * Blockchain & Web3: Solidity, Web3.js, Ethers.js, Smart Contracts, Gas Optimization,DAO,Trading Platforms,ICo,NFTS,ERC
        * Data Analytics: Dashboards, Predictive Analytics, AI Integration
        * SEO & Digital Growth
        * Mobile Development: iOS, Android, React Native
        * 24/7 Support and Maintenance

      - Pricing (guideline only):
        * Starter projects: $2,999+
        * Professional projects: $7,999+
        * Enterprise: Custom pricing

      ✅ Instructions:
      - Never provide code or programming solutions.
      - Only answer questions about our services, pricing, or company info.
      - Keep responses short, professional, and client-focused.
      - Suggest using the contact form or scheduling a consultation for further details.
      - If user asks about our services → list the relevant service(s) clearly.
      - If user asks about unrelated services → politely say we don’t offer that, but suggest the closest relevant service.
      - If user asks about pricing → give ranges above, and suggest booking a consultation for an exact quote.
      - Keep answers concise, professional, and client-focused.
      - Encourage them to use the contact form or schedule a consultation if interested.
      - Never hallucinate services outside this list.
      `
    };

    const response = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b-instruct",
      messages: [systemMessage, ...messages],
      max_tokens: 100,
      temperature: 0.6,
    });

    return response.choices[0].message.content || "I apologize, but I'm having trouble processing your request right now. Please try again or contact our support team directly.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "We will be available soon work in progress";
  }
}

export async function generateProjectSuggestions(projectDescription: string): Promise<{
  suggestions: string[],
  estimatedBudget: string,
  timeline: string
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b-instruct",
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

    console.log(result, 'test result gpt based')

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
