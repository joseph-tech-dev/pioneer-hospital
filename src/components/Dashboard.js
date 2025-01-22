import React from 'react';
import '../styles/Dashboard.css'; // Import the CSS file
import Navbar from './Navbar'; // Import the Navbar component

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                <h1 className="dashboard-title">Task</h1>
                <h4 className="dashboard-text">Essy</h4>
                <p className="dashboard-text">
                    *You take care of the login <br />
                    *Follow the dashboard styling 
                </p>
                <h4 className="dashboard-text">Zozo</h4>
                <p className="dashboard-text">
                    *Take care of the Registration(Sign Up) <br />
                    *Follow the dashboard styling
                </p>
                {/* Add more dashboard elements here */}
            </div>
        </div>
    );
};

export default Dashboard;
