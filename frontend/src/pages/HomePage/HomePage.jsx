import React from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Welcome to GamerPro Math Game!</h1>
            <p>Challenge your math skills and climb the leaderboard.</p>
            <div className="navigation-buttons">
                <Link to="/game" className="button">Start Game</Link>
                <Link to="/leaderboard" className="button">View Leaderboard</Link>
            </div>
        </div>
    );
};
export default HomePage;

