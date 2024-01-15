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
                setUserInfo(data.attributes.preferred_username);
            } catch (error) {
                console.log('Error fetching user info: ', error);
            }
        };

        fetchUserInfo();
    }, []);

    const signOut = async () => {
        try {
            await signOut();
            setUserInfo(null);
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    };

    return (
        <nav>
            <ul>
                <li><NavLink exact="true" to="/" activeclassame="active">Home</NavLink></li>
                <li><NavLink to="/game" activeclassname="active">Game</NavLink></li>
                <li><NavLink to="/leaderboard" activeclassname="active">Leaderboard</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;