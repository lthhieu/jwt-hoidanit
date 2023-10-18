import React from 'react';
import './Register.scss';
import { useHistory } from "react-router-dom";
const Register = () => {
    let history = useHistory();
    const handleLoginPage = () => {
        history.push("/login");
    }
    return (
        <div className='register-container min-vh-100 p-3'>
            <div className='container'>
                <div className='mt-3 mt-md-5 row px-3'>
                    <div className='content-left d-none d-md-block col-md-6'>
                        <div className='text-primary h1'>JWT</div>
                        <div className='fs-5'>JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.</div>
                    </div>
                    <div className='content-right col-12 col-md-6'>
                        <div className='bg-white register-box px-3 pt-4 shadow d-flex flex-column gap-3'>
                            <div className='text-primary text-center h1 d-block d-md-none'>JWT</div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" placeholder="Enter username" />
                            </div>
                            <div className="form-group">
                                <label>Phone number</label>
                                <input type="text" className="form-control" placeholder="Enter phone number" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Type password" />
                            </div>
                            <div className="form-group">
                                <label>Retype password</label>
                                <input type="password" className="form-control" placeholder="Retype password" />
                            </div>
                            <div className="form-group">
                                <button className='btn btn-primary fs-6 fw-bold'>Sign Up</button>
                            </div>
                            <div onClick={() => handleLoginPage()} className="form-group mb-3">
                                <span className='forgotten-password text-center text-primary'>Already have an account? Log In</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Register;
