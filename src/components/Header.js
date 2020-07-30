import React from 'react';
import {NavLink} from 'react-router-dom'


function Header() {
    return(
        <nav className="navbar justify-content-center">
            <li className="nav-item nav-link">
                <NavLink to="/top-games">Top Games</NavLink>
            </li>
            <li className="nav-item nav-link">
                <NavLink to="/top-streams">Top Live Streams</NavLink>
            </li>
        </nav>
    );
}


export default Header