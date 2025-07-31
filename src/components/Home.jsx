import React, { useContext, useEffect } from 'react'

import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/authContext';

const Home = () => {
    const { token, loggedin, reqUser, setReqUser, setLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(loggedin == false){
            navigate('/login')
        }
    },[loggedin])

    return <h2>Home Component</h2>
}

export default Home