import React, { useContext, useEffect } from 'react'

import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/authContext';

const Home = () => {
    const { loggedin } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (loggedin === false) {
            navigate('/login');
        }
    }, [loggedin, navigate]);

    return <h2>Home Component</h2>
}

export default Home