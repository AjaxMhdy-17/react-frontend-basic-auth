import React, { useContext, useState } from 'react'
import Spinner from '../layout/Spinner';
import { renderValidationErrors } from '../../helpers/validation';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../helpers/url';
import axios from 'axios';
import { AuthContext } from '../../helpers/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const { loggedin } = useContext(AuthContext)
  if (loggedin) {
    navigate('/');
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    const data = {
      email, password
    }

    try {
      const response = await axios.post(`${BASE_URL}/login`, data);
      localStorage.setItem('token', JSON.stringify(response.data.response.token));
      setLoading(false);
      setEmail("");
      setPassword("");
      navigate('/');
    } catch (errors) {
      setLoading(false);
      setErrors(errors.response.data.message)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h4 className="card-title mb-4 text-center">Login</h4>
              <>
                {renderValidationErrors(errors, "invalidLogin")}
              </>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="form-control" id="email" placeholder="Enter your email" />
                  <>
                    {renderValidationErrors(errors, "email")}
                  </>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="form-control" id="password" placeholder="Enter password" />

                  <>
                    {renderValidationErrors(errors, "password")}
                  </>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary w-100">
                    {
                      loading ?
                        <Spinner />
                        :
                        "Login"
                    }
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login