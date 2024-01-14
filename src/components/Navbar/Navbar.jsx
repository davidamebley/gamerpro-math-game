import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/game" activeClassName="active">Game</NavLink></li>
                <li><NavLink to="/leaderboard" activeClassName="active">Leaderboard</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;