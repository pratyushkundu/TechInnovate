import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import VoiceAgent from "./voiceagent";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chatbot opens
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! 👋 I'm your assistant Neha from Hukitola Solutions. How can I help you today? I can answer questions about our services, pricing, or help you get started with your project.",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/chat/message", {
        message: input.trim(),
        sessionId: sessionId,
      });

      const data = await response.json();

      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      const assistantMessage: ChatMessage = {
        id: Date.now().toString() + '_assistant',
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (<>

 {/* Voice Agent */}
    <div className="fixed bottom-6 right-6 z-40">
      <VoiceAgent />
    </div>

    {/* Chatbot */}
    
     <div className="fixed bottom-28 right-6 z-50" data-testid="chatbot">
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-tech rounded-full shadow-2xl shadow-tech-purple/25 hover:scale-110 transition-transform duration-300"
        data-testid="chatbot-toggle"
      >
        {isOpen ? (
          <X className="text-white text-xl" />
        ) : (
          <MessageCircle className="text-white text-xl" />
        )}
      </Button>

      {/* Chatbot Interface */}
      {isOpen && (

        <Card
          className={`
    fixed bottom-28 right-4         /* move card up from toggle button */
    w-[90vw] max-w-md       /* mobile: 90% of viewport width, max 28rem */
    h-[60vh] max-h-[500px]  /* mobile: 60% of viewport height, max 500px */
    md:w-96 md:h-[500px]    /* desktop: fixed width 24rem, height 500px */
    bg-card/95 backdrop-blur-md border border-border shadow-2xl
    transform transition-all duration-300
    ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
    flex flex-col
  `}
          data-testid="chatbot-interface"
        >
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-tech rounded-full flex items-center justify-center">
                <Bot className="text-white" />
              </div>
              <div>
                <div className="font-semibold">AI Assistant</div>
                <div className="text-sm text-muted-foreground">Online • Ready to help</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              data-testid="close-chatbot"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="p-4 h-80 overflow-y-auto space-y-4" data-testid="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3">
                {message.role === 'assistant' ? (
                  <div className="w-8 h-8 bg-gradient-tech rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="text-white text-sm" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-muted-foreground text-sm" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl max-w-xs ${message.role === 'assistant'
                    ? 'bg-muted'
                    : 'bg-tech-blue text-white ml-auto'
                    }`}
                  data-testid={`message-${message.role}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-tech rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white text-sm" />
                </div>
                <div className="bg-muted p-3 rounded-xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-tech-blue rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-tech-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-tech-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-background border-border focus:border-tech-purple"
                disabled={isLoading}
                data-testid="chat-input"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-tech hover:scale-105 transition-transform duration-300"
                data-testid="send-message"
              >
                <Send className="text-white text-sm" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  </>
  
  );
}
