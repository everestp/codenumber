
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import LandingPage from '../components/LandingPage';
import PracticeView from '../components/PracticeView';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'practice'>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleStartPracticing = () => {
    setCurrentView('practice');
  };

  const handleNavigateHome = () => {
    setCurrentView('landing');
    setSidebarOpen(false);
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onMenuToggle={handleMenuToggle}
        showMenuButton={currentView === 'practice'}
        onNavigateHome={handleNavigateHome}
      />
      
      {currentView === 'landing' ? (
        <LandingPage onStartPracticing={handleStartPracticing} />
      ) : (
        <PracticeView
          sidebarOpen={sidebarOpen}
          onSidebarClose={handleSidebarClose}
        />
      )}
    </div>
  );
};

export default Index;
