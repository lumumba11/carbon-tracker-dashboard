import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, Car, ShoppingBag, Leaf, TrendingDown } from 'lucide-react';

const Insights = ({ userData }) => {
  // Mock category data - in a real app, this would come from props or API
  const categoryData = [
    { name: 'electricity', value: 58.5 },
    { name: 'car', value: 5.4 },
    { name: 'food', value: 7.5 },
    { name: 'electronics', value: 50 },
    { name: 'bus', value: 1.5 }
  ];

  // Recommendations based on data
  const getRecommendations = () => {
    const recommendations = [];
    const highest = categoryData.reduce((max, cat) => cat.value > max.value ? cat : max, { name: '', value: 0 });

    if (highest.name === 'electricity' && highest.value > 30) {
      recommendations.push({
        icon: <Zap className="w-5 h-5" />,
        title: 'High Electricity Usage',
        tip: 'Switch to LED bulbs and unplug devices when not in use',
        impact: '↓ 20-30% reduction'
      });
    }
    if (highest.name === 'car' && highest.value > 10) {
      recommendations.push({
        icon: <Car className="w-5 h-5" />,
        title: 'Transportation Impact',
        tip: 'Try carpooling or public transport 2-3 days per week',
        impact: '↓ 40% reduction'
      });
    }
    if (highest.name === 'food' && highest.value > 15) {
      recommendations.push({
        icon: <ShoppingBag className="w-5 h-5" />,
        title: 'Food Footprint',
        tip: 'Reduce meat consumption and choose local produce',
        impact: '↓ 25% reduction'
      });
    }

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

  const recommendations = getRecommendations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Personalized Recommendations */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-xl">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Personalized Recommendations</h2>
              <p className="text-gray-600">Tips tailored to your carbon footprint</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
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

        {/* Comparison Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How You Compare</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Emissions Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: 'You', value: userData.totalEmissions || 0 },
                    { name: 'Kenya Avg', value: 85 },
                    { name: 'Global Avg', value: 120 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value) => [`${value} kg CO₂e`, 'Weekly Emissions']}
                  />
                  <Bar
                    dataKey="value"
                    fill="#10b981"
                    radius={[8, 8, 0, 0]}
                    name="Weekly Emissions"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Your Progress</h4>
                <p className="text-gray-600 text-sm mb-3">
                  {userData.totalEmissions < 85
                    ? "You're emitting less than the average Kenyan! Keep up the great work. 🌟"
                    : "You're above the Kenyan average. Focus on reducing your highest impact areas."}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Your emissions:</span>
                  <span className="font-semibold text-gray-900">{userData.totalEmissions.toFixed(1)} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kenya average:</span>
                  <span className="font-semibold text-gray-900">85 kg</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Reduction Opportunities</h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Switch to renewable energy sources
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Use public transportation more often
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Reduce food waste and choose plant-based options
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Invest in energy-efficient appliances
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <p className="text-3xl font-bold text-green-600 mb-2">-15%</p>
              <p className="text-gray-600">Reduction from last month</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <p className="text-3xl font-bold text-blue-600 mb-2">42%</p>
              <p className="text-gray-600">Of your goal achieved</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <p className="text-3xl font-bold text-purple-600 mb-2">7</p>
              <p className="text-gray-600">Consecutive tracking days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;