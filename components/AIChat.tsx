'use client';

import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { aiCoach } from '../lib/ai-service';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I\'m your AI trading coach. I can help you analyze your trading patterns, identify optimal trading hours, and provide personalized feedback. What would you like to know?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiCoach.generateAIResponse(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I\'m experiencing some technical difficulties. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="notification-card">
      <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={message.isUser ? 'agent-bubble-user' : 'agent-bubble-ai'}>
              {!message.isUser && (
                <div className="flex items-center mb-1">
                  <Bot className="w-3 h-3 text-accent mr-1" />
                  <span className="text-xs text-text-secondary">AI Coach</span>
                </div>
              )}
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="agent-bubble-ai">
              <div className="flex items-center">
                <Bot className="w-3 h-3 text-accent mr-1" />
                <span className="text-xs text-text-secondary">AI Coach is typing...</span>
              </div>
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask your AI coach..."
          className="flex-1 bg-background border border-gray-600 rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-primary text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
