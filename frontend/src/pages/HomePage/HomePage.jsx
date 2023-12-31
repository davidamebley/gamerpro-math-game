import React from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css';
import '../../components/Navbar/Navbar.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to the GamerPro Math Game!</h1>
                <p>Challenge your math skills and climb the leaderboard.</p>
            </div>
            <div className="navigation-buttons">
                <Link to="/game" className="button" aria-label='Start Game button'>Start Game</Link>
                <Link to="/leaderboard" className="button" aria-label='View Leaderboard button'>View Leaderboard</Link>
            </div>
        </div>
    );
};
export default HomePage;

