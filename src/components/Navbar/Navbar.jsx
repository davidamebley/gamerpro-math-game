import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth';

import './Navbar.css';

const Navbar = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const getCurrentUserInfo = async () => {
        const { username } = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        return { username, attributes };
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getCurrentUserInfo();
                setUserInfo(data);
            } catch (error) {
                console.log('Error fetching user info: ', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            setUserInfo(null);
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);  // toggle dropdown state

    return (
        <nav>
            <ul>
                <li><NavLink exact="true" to="/" activeclassame="active">Home</NavLink></li>
                <li><NavLink to="/game" activeclassname="active">Game</NavLink></li>
                <li><NavLink to="/leaderboard" activeclassname="active">Leaderboard</NavLink></li>
                {userInfo && (
                    <li className="user-info">
                        <div className="user-initial" onClick={toggleDropdown}>
                            <img src={userInfo.attributes.picture} alt="user-initial" />
                            {/* Get Username initial */}
                            {userInfo.attributes.preferred_username[0].toUpperCase()}
                        </div>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <p>
                                    {userInfo.attributes.preferred_username}
                                    <button onClick={handleSignOut}>Sign Out</button>
                                </p>
                            </div>
                        )}
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;