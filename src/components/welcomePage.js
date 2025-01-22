import React, { useEffect } from 'react';
import '../styles/welcomePage.css';

const WelcomePage = ({ onAnimationComplete }) => {
    useEffect(() => {
        // Start a timer to call onAnimationComplete after 3 seconds
        const timer = setTimeout(() => {
            onAnimationComplete();
        }, 3000);

        // Clear the timer if the component is unmounted
        return () => clearTimeout(timer);
    }, [onAnimationComplete]);

    return (
        <div className="welcome-container">
            <h1 className="animated-text">WELCOME TO PIONEER HOSPITAL</h1>
        </div>
    );
};

export default WelcomePage;
