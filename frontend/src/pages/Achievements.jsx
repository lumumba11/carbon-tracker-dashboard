import React from 'react';
import { Award, Trophy, Star, Target, Calendar, Zap } from 'lucide-react';

const Achievements = () => {
  const badges = [
    {
      emoji: '🌟',
      title: 'First Week',
      desc: 'Completed first week of tracking',
      earned: true,
      date: '2024-12-15',
      points: 100
    },
    {
      emoji: '🌱',
      title: 'Eco Warrior',
      desc: 'Stayed under goal for 3 days',
      earned: true,
      date: '2024-12-18',
      points: 150
    },
    {
      emoji: '💧',
      title: 'Water Saver',
      desc: 'Reduced footprint by 20%',
      earned: true,
      date: '2024-12-20',
      points: 200
    },
    {
      emoji: '🔥',
      title: '7-Day Streak',
      desc: 'Log daily for 7 consecutive days',
      earned: false,
      date: null,
      points: 250
    },
    {
      emoji: '🎯',
      title: 'Goal Master',
      desc: 'Meet weekly goal 4 times',
      earned: false,
      date: null,
      points: 300
    },
    {
      emoji: '🏆',
      title: 'Carbon Hero',
      desc: 'Top 10% globally',
      earned: false,
      date: null,
      points: 500
    },
    {
      emoji: '⚡',
      title: 'Energy Efficient',
      desc: 'Reduce electricity usage by 30%',
      earned: false,
      date: null,
      points: 175
    },
    {
      emoji: '🚲',
      title: 'Green Commuter',
      desc: 'Use sustainable transport for a month',
      earned: false,
      date: null,
      points: 225
    }
  ];

  const stats = {
    totalPoints: 450,
    level: 3,
    nextLevelPoints: 550,
    badgesEarned: 3,
    totalBadges: 8,
    rank: 'Eco Warrior',
    progress: 62
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalPoints}</p>
            <p className="text-sm text-gray-500 mt-1">Total Points</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">Level {stats.level}</p>
            <p className="text-sm text-gray-500 mt-1">{stats.rank}</p>
            <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.badgesEarned}/{stats.totalBadges}</p>
            <p className="text-sm text-gray-500 mt-1">Badges Earned</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.nextLevelPoints - stats.totalPoints}</p>
            <p className="text-sm text-gray-500 mt-1">Points to Next Level</p>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-green-100 p-3 rounded-xl">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Achievements</h2>
              <p className="text-gray-600">Earn badges by tracking and reducing your carbon footprint</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  badge.earned
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 transform hover:scale-105'
                    : 'bg-gray-50 border-gray-200 opacity-50'
                }`}
              >
                <div className="text-5xl mb-4 text-center">{badge.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-center">{badge.title}</h3>
                <p className="text-sm text-gray-600 mb-3 text-center">{badge.desc}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                    {badge.points} pts
                  </span>
                  {badge.earned ? (
                    <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      Earned
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Locked
                    </span>
                  )}
                </div>

                {badge.earned && badge.date && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>Earned {new Date(badge.date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Level Progress</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(level => (
                <div key={level} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      level <= stats.level
                        ? 'bg-green-500 text-white'
                        : level === stats.level + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {level <= stats.level ? '✓' : level}
                    </div>
                    <span className={`font-medium ${
                      level <= stats.level ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      Level {level} {level === 1 && '(Starter)'}
                      {level === 2 && '(Eco Enthusiast)'}
                      {level === 3 && '(Eco Warrior)'}
                      {level === 4 && '(Climate Champion)'}
                      {level === 5 && '(Planet Guardian)'}
                    </span>
                  </div>
                  {level <= stats.level && (
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Next Badges</h3>
            <div className="space-y-3">
              {badges.filter(b => !b.earned).slice(0, 3).map((badge, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl opacity-50">{badge.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{badge.title}</h4>
                    <p className="text-xs text-gray-500">{badge.desc}</p>
                  </div>
                  <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                    {badge.points} pts
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
              View All Challenges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;