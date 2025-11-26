import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Leaf, Zap, Car, ShoppingBag, TrendingDown, Award, Plus, Calendar, BarChart3, Target, Bell, MessageCircle, X, Send, Loader, Sparkles, Lightbulb, AlertCircle } from 'lucide-react';

// CarbonChatbot Component (paste this inside the same file, before CarbonTrackingDashboard)
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

// Main Dashboard Component (updated)
const CarbonTrackingDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    totalEmissions: 0,
    weeklyGoal: 50,
    streak: 0,
    badges: []
  });

  const [logs, setLogs] = useState([]);
  const [showAddLog, setShowAddLog] = useState(false);
  const [logType, setLogType] = useState('electricity');
  const [timeRange, setTimeRange] = useState('week');

  // Emission factors (kg CO2e per unit)
  const emissionFactors = {
    electricity: { factor: 0.18, unit: 'kWh' },
    petrol: { factor: 2.31, unit: 'liter' },
    diesel: { factor: 2.68, unit: 'liter' },
    car: { factor: 0.12, unit: 'km' },
    bus: { factor: 0.05, unit: 'km' },
    motorbike: { factor: 0.08, unit: 'km' },
    food: { factor: 2.5, unit: 'meal' },
    electronics: { factor: 50, unit: 'item' },
    clothing: { factor: 15, unit: 'item' }
  };

  // Initialize with sample data
  useEffect(() => {
    const sampleLogs = [
      { id: 1, type: 'electricity', value: 120, date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), co2e: 21.6 },
      { id: 2, type: 'car', value: 45, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), co2e: 5.4 },
      { id: 3, type: 'food', value: 3, date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), co2e: 7.5 },
      { id: 4, type: 'electricity', value: 95, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), co2e: 17.1 },
      { id: 5, type: 'bus', value: 30, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), co2e: 1.5 },
      { id: 6, type: 'electronics', value: 1, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), co2e: 50 },
      { id: 7, type: 'electricity', value: 110, date: new Date(), co2e: 19.8 }
    ];
    setLogs(sampleLogs);
  }, []);

  // Calculate total emissions
  useEffect(() => {
    const total = logs.reduce((sum, log) => sum + log.co2e, 0);
    setUserData(prev => ({ ...prev, totalEmissions: total }));
  }, [logs]);

  // Add new log
  const handleAddLog = (logData) => {
    const factor = emissionFactors[logData.category]?.factor || 1;
    const co2e = logData.value * factor;

    const newLog = {
      id: logs.length + 1,
      type: logData.category,
      value: logData.value,
      date: new Date(),
      co2e: co2e
    };

    setLogs([...logs, newLog]);
    setShowAddLog(false);
  };

  // Prepare chart data
  const getDailyData = () => {
    const dailyMap = {};
    logs.forEach(log => {
      const day = log.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dailyMap[day] = (dailyMap[day] || 0) + log.co2e;
    });
    return Object.entries(dailyMap).map(([day, value]) => ({ day, emissions: parseFloat(value.toFixed(2)) }));
  };

  const getCategoryData = () => {
    const categoryMap = {};
    logs.forEach(log => {
      const category = log.type;
      categoryMap[category] = (categoryMap[category] || 0) + log.co2e;
    });
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }));
  };

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Calculate insights
  const getInsights = () => {
    const categoryData = getCategoryData();
    const highest = categoryData.reduce((max, cat) => cat.value > max.value ? cat : max, { name: '', value: 0 });
    const weeklyAvg = userData.totalEmissions / 7;
    const goalProgress = (userData.totalEmissions / userData.weeklyGoal) * 100;

    return {
      highest,
      weeklyAvg: weeklyAvg.toFixed(1),
      goalProgress: Math.min(goalProgress, 100).toFixed(0),
      status: goalProgress <= 100 ? 'On Track' : 'Over Budget'
    };
  };

  const insights = getInsights();

  // Recommendations based on data
  const getRecommendations = () => {
    const categoryData = getCategoryData();
    const recommendations = [];

    categoryData.forEach(cat => {
      if (cat.name === 'electricity' && cat.value > 30) {
        recommendations.push({
          icon: <Zap className="w-5 h-5" />,
          title: 'High Electricity Usage',
          tip: 'Switch to LED bulbs and unplug devices when not in use',
          impact: '↓ 20-30% reduction'
        });
      }
      if (cat.name === 'car' && cat.value > 10) {
        recommendations.push({
          icon: <Car className="w-5 h-5" />,
          title: 'Transportation Impact',
          tip: 'Try carpooling or public transport 2-3 days per week',
          impact: '↓ 40% reduction'
        });
      }
      if (cat.name === 'food' && cat.value > 15) {
        recommendations.push({
          icon: <ShoppingBag className="w-5 h-5" />,
          title: 'Food Footprint',
          tip: 'Reduce meat consumption and choose local produce',
          impact: '↓ 25% reduction'
        });
      }
    });

    if (recommendations.length === 0) {
      recommendations.push({
        icon: <Leaf className="w-5 h-5" />,
        title: 'Great Work!',
        tip: 'You\'re doing well. Keep maintaining sustainable habits',
        impact: '✓ Stay green'
      });
    }

    return recommendations;
  };

  // Add Log Modal Component
  const AddLogModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({ category: 'electricity', value: '' });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Entry</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <optgroup label="Energy">
                  <option value="electricity">Electricity</option>
                </optgroup>
                <optgroup label="Transport">
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                  <option value="motorbike">Motorbike</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                </optgroup>
                <optgroup label="Consumption">
                  <option value="food">Food</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ({emissionFactors[formData.category]?.unit || 'units'})
              </label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="Enter value"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {formData.value && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Estimated CO₂e</p>
                <p className="text-2xl font-bold text-green-600">
                  {(formData.value * emissionFactors[formData.category]?.factor).toFixed(2)} kg
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => formData.value && onSave(formData)}
              disabled={!formData.value}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Entry
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CarbonTrack</h1>
                <p className="text-sm text-gray-500">Track. Reduce. Sustain.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                  <p className="text-xs text-gray-500">Level 3 Eco-Warrior</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {userData.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'insights', label: 'Insights', icon: TrendingDown },
              { id: 'achievements', label: 'Achievements', icon: Award }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  currentView === item.id
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    This Week
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{userData.totalEmissions.toFixed(1)}</p>
                <p className="text-sm text-gray-500 mt-1">kg CO₂e</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600">Goal: {userData.weeklyGoal} kg</p>
                  <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${insights.goalProgress <= 100 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(insights.goalProgress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <TrendingDown className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    insights.status === 'On Track' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'
                  }`}>
                    {insights.status}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{insights.weeklyAvg}</p>
                <p className="text-sm text-gray-500 mt-1">kg/day avg</p>
                <p className="text-xs text-gray-600 mt-4">
                  {insights.status === 'On Track' ? 'Keep it up!' : 'Try to reduce daily usage'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{insights.highest.name}</p>
                <p className="text-sm text-gray-500 mt-1">Highest Impact</p>
                <p className="text-xs text-gray-600 mt-4">
                  {insights.highest.value.toFixed(1)} kg CO₂e total
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-500 mt-1">Badges Earned</p>
                <div className="flex gap-1 mt-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">🌟</div>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">🌱</div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">💧</div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Emissions Trend */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Emissions Trend</h3>
                  <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={getDailyData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="emissions" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Category Breakdown</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={getCategoryData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getCategoryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                <button
                  onClick={() => setShowAddLog(true)}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Entry
                </button>
              </div>

              <div className="space-y-3">
                {logs.slice(-5).reverse().map(log => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        log.type.includes('electric') ? 'bg-yellow-100' :
                        log.type.includes('car') || log.type.includes('bus') || log.type.includes('motor') ? 'bg-blue-100' :
                        'bg-green-100'
                      }`}>
                        {log.type.includes('electric') ? <Zap className="w-5 h-5 text-yellow-600" /> :
                         log.type.includes('car') || log.type.includes('bus') || log.type.includes('motor') ? <Car className="w-5 h-5 text-blue-600" /> :
                         <ShoppingBag className="w-5 h-5 text-green-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{log.type}</p>
                        <p className="text-sm text-gray-500">{log.value} {emissionFactors[log.type]?.unit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{log.co2e.toFixed(2)} kg</p>
                      <p className="text-xs text-gray-500">{log.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'insights' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personalized Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getRecommendations().map((rec, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-3 rounded-lg text-green-600">
                        {rec.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{rec.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{rec.tip}</p>
                        <span className="inline-block text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                          {rec.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparison</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'You', value: userData.totalEmissions },
                  { name: 'Kenya Avg', value: 85 },
                  { name: 'Global Avg', value: 120 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {currentView === 'achievements' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { emoji: '🌟', title: 'First Week', desc: 'Completed first week of tracking', earned: true },
                { emoji: '🌱', title: 'Eco Warrior', desc: 'Stayed under goal for 3 days', earned: true },
                { emoji: '💧', title: 'Water Saver', desc: 'Reduced footprint by 20%', earned: true },
                { emoji: '🔥', title: '7-Day Streak', desc: 'Log daily for 7 consecutive days', earned: false },
                { emoji: '🎯', title: 'Goal Master', desc: 'Meet weekly goal 4 times', earned: false },
                { emoji: '🏆', title: 'Carbon Hero', desc: 'Top 10% globally', earned: false }
              ].map((badge, index) => (
                <div key={index} className={`p-6 rounded-xl border-2 ${badge.earned ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
                  <div className="text-5xl mb-4">{badge.emoji}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{badge.title}</h3>
                  <p className="text-sm text-gray-600">{badge.desc}</p>
                  {badge.earned && (
                    <span className="inline-block mt-4 text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                      Earned
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Carbon Chatbot */}
      <CarbonChatbot
        userEmissions={userData.totalEmissions}
        categoryBreakdown={getCategoryData()}
      />

      {showAddLog && <AddLogModal onClose={() => setShowAddLog(false)} onSave={handleAddLog} />}
    </div>
  );
};

export default CarbonTrackingDashboard;