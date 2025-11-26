import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Leaf, Lightbulb, TrendingDown, AlertCircle } from 'lucide-react';

const CarbonChatbot = ({ userEmissions, categoryBreakdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("👋 Hi! I'm your Carbon Assistant. I can help you understand your emissions, give personalized tips, answer questions about climate change, and guide you toward a greener lifestyle. How can I help you today?");
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text, type = 'text', options = null) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'bot',
      text,
      type,
      options,
      timestamp: new Date()
    }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date()
    }]);
  };

  // Knowledge base for chatbot responses
  const knowledgeBase = {
    emissions: {
      keywords: ['emission', 'emissions', 'carbon', 'co2', 'footprint', 'total', 'how much'],
      response: () => {
        const total = userEmissions || 0;
        const avgDaily = (total / 7).toFixed(1);
        return `Based on your data, your total weekly emissions are ${total.toFixed(1)} kg CO₂e, averaging ${avgDaily} kg per day. The global average is about 17 kg CO₂e per day. ${total / 7 < 17 ? "You're doing great! 🌟" : "There's room for improvement. Let me suggest some ways to reduce it."}`;
      }
    },
    electricity: {
      keywords: ['electricity', 'power', 'energy', 'kwh', 'lights', 'appliances'],
      response: () => {
        const elecCategory = categoryBreakdown?.find(cat => cat.name === 'electricity');
        const tips = [
          "💡 Switch to LED bulbs - they use 75% less energy",
          "🔌 Unplug devices when not in use to avoid phantom power",
          "🌡️ Set your thermostat 2°C lower in winter, 2°C higher in summer",
          "⚡ Use energy-efficient appliances (A+++ rating)",
          "☀️ Consider installing solar panels for long-term savings"
        ];
        return elecCategory
          ? `Your electricity emissions are ${elecCategory.value.toFixed(1)} kg CO₂e this week. Here are some tips:\n\n${tips.join('\n')}`
          : "Track your electricity usage to get personalized insights! Here are general tips:\n\n" + tips.join('\n');
      }
    },
    transport: {
      keywords: ['transport', 'car', 'bus', 'travel', 'commute', 'driving', 'fuel'],
      response: () => {
        const tips = [
          "🚲 Bike or walk for trips under 5km",
          "🚌 Use public transport - it's 45% more efficient per passenger",
          "🚗 Carpool with colleagues or friends",
          "🏠 Work from home when possible",
          "🔋 Consider an electric or hybrid vehicle",
          "🚂 Choose trains over planes for medium distances"
        ];
        return "Transportation is often the biggest source of personal emissions. Try these:\n\n" + tips.join('\n');
      }
    },
    food: {
      keywords: ['food', 'eat', 'diet', 'meat', 'vegetarian', 'vegan', 'meal'],
      response: () => {
        return `🍽️ Food choices have a huge climate impact! Here's how to reduce it:\n\n🥕 Eat more plant-based meals - beef has 20x the emissions of vegetables\n🌾 Choose local and seasonal produce\n🥡 Reduce food waste - plan meals and store food properly\n🐟 If eating meat, choose chicken or fish over beef\n🥤 Drink tap water instead of bottled\n♻️ Compost food scraps`;
      }
    },
    reduce: {
      keywords: ['reduce', 'lower', 'decrease', 'cut', 'less', 'minimize', 'tips', 'help'],
      response: () => {
        const highest = categoryBreakdown?.sort((a, b) => b.value - a.value)[0];
        if (highest) {
          return `Your highest impact area is ${highest.name}. Focus here for maximum effect! Would you like specific tips for reducing ${highest.name} emissions?`;
        }
        return `Here are the most effective ways to reduce your carbon footprint:\n\n1. 🚗 Transportation: Switch to public transit, bike, or electric vehicles\n2. ⚡ Energy: Use renewable energy and improve home efficiency\n3. 🍽️ Food: Eat more plants, waste less food\n4. 🛍️ Consumption: Buy less, choose sustainable products\n5. ♻️ Waste: Recycle, compost, and avoid single-use items`;
      }
    },
    climate: {
      keywords: ['climate', 'change', 'warming', 'global', 'crisis', 'danger', 'impact', 'effects'],
      response: () => {
        return `🌍 Climate change is the defining challenge of our time:\n\n🌡️ Global temperatures have risen 1.1°C since pre-industrial times\n🌊 Sea levels are rising 3.4mm per year\n🔥 Extreme weather events are becoming more frequent\n❄️ Arctic ice is melting at 13% per decade\n🌪️ We need to limit warming to 1.5°C to avoid catastrophic impacts\n\nEvery action counts! Your tracking and reduction efforts make a real difference.`;
      }
    },
    offset: {
      keywords: ['offset', 'compensate', 'carbon credit', 'neutralize', 'plant trees'],
      response: () => {
        return `🌳 Carbon offsetting can complement your reduction efforts:\n\n✅ Best options:\n• Plant native trees (1 tree absorbs ~21kg CO₂/year)\n• Support verified renewable energy projects\n• Invest in carbon capture technology\n• Fund reforestation programs\n\n⚠️ Remember: Offsetting should come AFTER reducing emissions. Reduction is always better than compensation!`;
      }
    },
    goal: {
      keywords: ['goal', 'target', 'aim', 'achieve', 'recommend', 'should'],
      response: () => {
        const current = (userEmissions || 0) / 7;
        const target = current * 0.8;
        return `🎯 Based on your current ${current.toFixed(1)} kg CO₂e/day:\n\nShort-term goal: Reduce to ${target.toFixed(1)} kg/day (20% reduction)\nMedium-term: Aim for 10 kg/day (Kenya average)\nLong-term: Target 2 kg/day (Paris Agreement goal)\n\nStart with small changes that fit your lifestyle. Even 10% reduction makes a difference!`;
      }
    }
  };

  const quickActions = [
    { icon: <TrendingDown className="w-4 h-4" />, text: "How can I reduce emissions?", query: "reduce" },
    { icon: <Leaf className="w-4 h-4" />, text: "Tips for sustainable living", query: "tips" },
    { icon: <Lightbulb className="w-4 h-4" />, text: "Explain my footprint", query: "emissions" },
    { icon: <AlertCircle className="w-4 h-4" />, text: "Climate change info", query: "climate" }
  ];

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // Check for greetings
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(input)) {
      return {
        text: "Hello! 👋 I'm here to help you understand and reduce your carbon footprint. What would you like to know?",
        options: quickActions
      };
    }

    // Check for thanks
    if (/thank|thanks|thx/.test(input)) {
      return {
        text: "You're welcome! 🌱 Remember, every small action counts toward a healthier planet. Is there anything else I can help you with?",
        options: null
      };
    }

    // Search knowledge base
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        return {
          text: data.response(),
          options: null
        };
      }
    }

    // Default response with suggestions
    return {
      text: "I'm not sure about that specific question, but I can help you with:\n\n• Understanding your carbon footprint\n• Tips for reducing emissions\n• Information about climate change\n• Setting and achieving goals\n• Sustainable lifestyle advice\n\nWhat would you like to explore?",
      options: quickActions
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    addUserMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const response = getBotResponse(userMessage);
      setIsTyping(false);
      addBotMessage(response.text, 'text', response.options);
    }, 1000);
  };

  const handleQuickAction = (query) => {
    addUserMessage(query);
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(query);
      setIsTyping(false);
      addBotMessage(response.text, 'text', response.options);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 z-50 group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Ask me anything! 🌱
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Carbon Assistant</h3>
                <p className="text-xs text-green-100">Always here to help 🌱</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>

                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(option.query)}
                          className="w-full flex items-center gap-2 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-sm font-medium"
                        >
                          {option.icon}
                          <span>{option.text}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs mt-2 opacity-60">
                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about carbon emissions..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Tip: Ask me about reducing emissions or climate change
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CarbonChatbot;