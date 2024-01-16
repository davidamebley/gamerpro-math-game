import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth';

import defaultAvatar from '../../assets/default-avatar.png';
import './Navbar.css';

const Navbar = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const user = await getCurrentUser();
                const attributes = await fetchUserAttributes();
                setUserInfo({ ...user, ...attributes });
            } catch (error) {
                console.log('Error fetching user info: ', error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        // Add event listener to handle clicks outside the dropdown
        const handleOutsideClick = (event) => {
            if (dropdownOpen && !event.target.closest('.user-info')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [dropdownOpen]);

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
                        <button className="user-initial-btn" onClick={toggleDropdown} title="View more">
                            <div className="user-initial">
                                {userInfo.preferred_username[0].toUpperCase()}
                            </div>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <div>
                                    <img src={defaultAvatar} alt="User Avatar" className="user-avatar" />
                                    <p>
                                        {userInfo.preferred_username}
                                    </p>
                                </div>
                                <button onClick={handleSignOut} aria-label="Sign out">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;