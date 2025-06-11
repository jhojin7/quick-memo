import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { MemoGrid } from './components/MemoGrid';
import { ViewMode } from './types/memo';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');

  return (
    <div className="min-h-screen">
      {currentView === 'landing' ? (
        <LandingPage onViewChange={setCurrentView} />
      ) : (
        <MemoGrid onViewChange={setCurrentView} />
      )}
    </div>
  );
}

export default App;