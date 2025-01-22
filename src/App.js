import React, { useState } from 'react';
import WelcomePage from './components/welcomePage';
import Dashboard from './components/Dashboard';

const App = () => {
    const [showDashboard, setShowDashboard] = useState(false); // Tracks which page to show

    return (
        <div>
            {showDashboard ? (
                <Dashboard />
            ) : (
                <WelcomePage onAnimationComplete={() => setShowDashboard(true)} />
            )}
        </div>
    );
};

export default App;
