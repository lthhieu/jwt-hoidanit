import React, { useContext, useEffect, useState } from 'react';
import './Login.scss';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { login } from '../../services/userService';
import { useHistory } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
const Login = () => {
    const { loginContext, user } = useContext(UserContext)
    let history = useHistory();
    const [valueLogin, setValueLogin] = useState("")
    const [password, setPassword] = useState("")
    const defaultValidValue = {
        validValueLogin: true,
        validPassword: true
    }
    const [validValue, setValidValue] = useState(defaultValidValue)
    const handleLogin = async () => {
        setValidValue(defaultValidValue)
        if (!valueLogin) {
            toast.error("Missing email or phone")
            setValidValue({ ...defaultValidValue, validValueLogin: false })
            return
        }
        if (!password) {
            toast.error("Missing password")
            setValidValue({ ...defaultValidValue, validPassword: false })
            return
        }
        let userData = { valueLogin, password }
        let response = await login(userData)
        if (response) {
            if (+response?.ec === 0) {
                let roles = response?.dt?.role
                let data = { account: { ...response?.dt?.account, roles }, auth: true, token: response?.dt?.access_token }
                localStorage.setItem('access_token', response?.dt?.access_token)
                loginContext(data)
                history.push("/dashboard")
                // window.location.reload()
            }
            else toast.error(response?.em)
        }
    }
    const handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }
    useEffect(() => {
        if (user?.auth) {
            history.push("/dashboard")
        }
    }, [])
    return (
        <div className='login-container min-vh-100 p-3'>
            <div className='container'>
                <div className='mt-3 mt-md-5 row px-3'>
                    <div className='content-left d-none d-md-block col-md-6'>
                        <div className='text-primary h1'>JWT</div>
                        <div className='fs-5'>JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.</div>
                    </div>
                    <div className='content-right col-12 col-md-6'>
                        <div className='bg-white login-box px-3 pt-4 shadow d-flex flex-column gap-3'>
                            <div className='text-primary text-center h1 d-block d-md-none'>JWT</div>
                            <input onChange={(e) => setValueLogin(e.target.value)} value={valueLogin} placeholder='Email address or phone' className={validValue.validValueLogin ? 'mt-2 form-control' : 'mt-2 form-control is-invalid'} type='text' />
                            <input onKeyPress={(e) => handlePressEnter(e)} onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' className={validValue.validPassword ? 'form-control' : 'form-control is-invalid'} type='password' />
                            <button onClick={() => handleLogin()} className='btn btn-primary fs-6 fw-bold'>Log In</button>
                            <span className='forgotten-password text-center text-primary'>Forgotten password?</span>
                            <hr />
                            <div className='text-center'>
                                <Link to="/register"><button className='btn btn-success fw-bold'>Create new account</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;