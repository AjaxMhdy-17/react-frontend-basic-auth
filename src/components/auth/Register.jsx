import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../helpers/url';
import { renderValidationErrors } from '../../helpers/validation';
import Spinner from '../layout/Spinner';
import { AuthContext } from '../../helpers/authContext';

const Register = () => {


    const { loggedin, setReqUser, setLoggedIn } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);



    if (loggedin) {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        const data = {
            name, email, password
        }
        try {
            const response = await axios.post(`${BASE_URL}/register`, data);
            localStorage.setItem('token', JSON.stringify(response.data.response.token));
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setLoggedIn(true);
            navigate('/');
        } catch (errors) {
            setLoading(false);
            if (errors.response.status) {
                setErrors(errors.response.data.message)
            }
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h4 className="card-title mb-4 text-center">Register</h4>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        className="form-control" id="name" placeholder="Enter your name" />
                                    <>
                                        {renderValidationErrors(errors, "name")}
                                    </>
                                </div>
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
                                                "Register"
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

export default Register