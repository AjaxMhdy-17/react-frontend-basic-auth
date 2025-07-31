import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Profile from "./components/user/Profile"
import Header from "./components/layout/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "./helpers/url"
import { getConfig } from "./helpers/config"
import { AuthContext } from "./helpers/authContext"
import Home from "./components/Home"


function App() {

  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
  const [reqUser, setReqUser] = useState({});
  const [loggedin, setLoggedIn] = useState(false);


  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        // console.log('No token found!');
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}/user`, getConfig(token));
        setReqUser(response.data.response);
        setLoggedIn(true)
      } catch (error) {
        if (error.message) {
          // localStorage.clear() ; 
          localStorage.removeItem('token');
          setReqUser({});
          setLoggedIn(false);
        }
      }
    }
    fetchCurrentUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ loggedin, reqUser, setReqUser, setLoggedIn, token }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}



export default App
