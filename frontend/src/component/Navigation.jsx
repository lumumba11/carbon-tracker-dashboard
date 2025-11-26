import React from 'react';
import { BarChart3, TrendingDown, Award, Users, Mail, Shield } from 'lucide-react';

const Navigation = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'insights', label: 'Insights', icon: TrendingDown },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
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
  );
};

export default Navigation;