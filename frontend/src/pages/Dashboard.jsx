import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Leaf, Zap, Car, ShoppingBag, TrendingDown, Award, Plus, Target, Bell } from 'lucide-react';
import AddLogModal from '../component/AddLogModal';

const Dashboard = ({ userData, setUserData }) => {
  const [logs, setLogs] = useState([]);
  const [showAddLog, setShowAddLog] = useState(false);

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
  }, [logs, setUserData]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <p className="text-3xl font-bold text-gray-900 capitalize">{insights.highest.name}</p>
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

      {showAddLog && <AddLogModal onClose={() => setShowAddLog(false)} onSave={handleAddLog} emissionFactors={emissionFactors} />}
    </div>
  );
};

export default Dashboard;