import React, { useState } from 'react';
import Header from './component/Header';
import Navigation from './component/Navigation';
import Footer from './component/Footer';
import CarbonChatbot from './component/CarbonChatbot';
import Dashboard from './pages/Dashboard';
import Insights from './pages/Insights';
import Achievements from './pages/Achievements';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';

const CarbonTrackingDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userData, setUserData] = useState({
    name: 'Admin',
    totalEmissions: 0,
    weeklyGoal: 50,
    streak: 0,
    badges: []
  });

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userData={userData} setUserData={setUserData} />;
      case 'insights':
        return <Insights userData={userData} />;
      case 'achievements':
        return <Achievements />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return <Dashboard userData={userData} setUserData={setUserData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex flex-col">
      <Header userData={userData} />
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <Footer setCurrentView={setCurrentView} />
      <CarbonChatbot userEmissions={userData.totalEmissions} />
    </div>
  );
};

export default CarbonTrackingDashboard;