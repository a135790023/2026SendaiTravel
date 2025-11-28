import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const Guide: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: '你好！我是你的 2026 仙台之旅 AI 導遊。想知道關於牛舌、樹冰或是行程的細節嗎？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!process.env.API_KEY) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: '錯誤：未設定 API Key。請確保環境變數 API_KEY 已設定。'
      }]);
      return;
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Format history for Gemini
    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await getGeminiResponse(userMsg.text, history);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: responseText }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: '抱歉，發生錯誤。請稍後再試。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white pb-20">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
          AI 隨身導遊
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2 flex-shrink-0">
                <Bot size={16} className="text-purple-600" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
             {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 flex-shrink-0">
                <User size={16} className="text-blue-600" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start">
             <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <Bot size={16} className="text-purple-600" />
              </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
               <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s'}}></div>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="詢問行程、天氣或美食..."
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`ml-2 p-2 rounded-full ${
              input.trim() ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guide;