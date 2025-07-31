import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../helpers/authContext';
import axios from 'axios';
import { BASE_URL } from '../../helpers/url';
import { getConfig } from '../../helpers/config';

const Header = () => {
    
    const { token , setToken , loggedin, setReqUser, setLoggedIn } = useContext(AuthContext);
    const location = useLocation();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/logout`, {}, getConfig(token));
            localStorage.removeItem('token');
            setReqUser({});
            setToken(null);
            setLoggedIn(false);

        } catch (error) {
            localStorage.removeItem('token');
            setReqUser({});
            setLoggedIn(false);
            setToken()
            // console.log(error);

        }

    }



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">MyLogo</a>

                    {/* Toggle button for mobile */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible menu */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname == '/' ? 'active' : ""}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname == '/about' ? 'active' : ""}`} to="/about">About</Link>
                            </li>

                            {loggedin ? (<>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname == '/profile' ? 'active' : ""}`} to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={handleLogout} className="nav-link">Logout</Link>
                                </li>
                            </>) : (
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname == '/login' ? 'active' : ""}`} to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname == '/register' ? 'active' : ""}`} to="/register">Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div >
                </div >
            </nav >
        </>
    )
}

export default Header