import React from 'react';
import './Login.scss';
import { Link } from "react-router-dom";
const Login = () => {
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
                            <input placeholder='Email address' className='mt-2 form-control' type='text' />
                            <input placeholder='Password' className='form-control' type='password' />
                            <button className='btn btn-primary fs-6 fw-bold'>Log In</button>
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