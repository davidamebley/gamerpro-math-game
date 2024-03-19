import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Oops! Page not found.</h2>
                <p>We can't seem to find the page you're looking for.</p>
                <Link to="/" className="button">Back to Home</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
