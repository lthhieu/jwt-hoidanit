import React, { useEffect, useState } from 'react';
import './Register.scss';
import { useHistory } from "react-router-dom";
import { register } from '../../services/userService';
import { toast } from 'react-toastify';
const Register = () => {
    const defaultData = {
        email: '',
        username: '',
        password: '',
        phone: '',
        address: '',
        sex: 'Male'
    }
    const defaultValid = {
        validEmail: true,
        validUsername: true,
        validPassword: true,
        validPhone: true,
        validAddress: true
    }
    const [formData, setFormData] = useState(defaultData)
    const [validFormData, setValidFormData] = useState(defaultValid)
    useEffect(() => {
        // axios.get("http://localhost:8080/api/test").then(data => console.log(data))
    }, [])
    const handleInputChange = (event) => {
        let { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    let history = useHistory();
    const handleLoginPage = () => {
        history.push("/login");
    }
    const validate = () => {
        setValidFormData(defaultValid)
        let { email, username, password, phone, address } = formData
        let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const validateRules = [
            { condition: !email, msg: 'Email is required', validError: 'validEmail' },
            { condition: !reg.test(email), msg: 'Email is not valid', validError: 'validEmail' },
            { condition: !username, msg: 'Username is required', validError: 'validUsername' },
            { condition: !password, msg: 'Password is required', validError: 'validPassword' },
            { condition: !phone, msg: 'Phone is required', validError: 'validPhone' },
            { condition: !address, msg: 'Address is required', validError: 'validAddress' }
        ]
        for (const rule of validateRules) {
            if (rule.condition) {
                toast.error(rule.msg)
                let { validError } = rule
                setValidFormData({ ...defaultValid, [validError]: false })
                return false
            }
        }
        return true
    }
    const handleSignUp = async () => {
        let userData = formData
        if (validate()) {
            let response = await register(userData)
            if (response) {
                if (+response?.ec === 0) {
                    toast.success(response?.em)
                    setFormData(defaultData)
                }
                else toast.error(response?.em)
            }
        }
    }
    return (
        <div className='register-container min-vh-100 p-3'>
            <div className='container'>
                <div className='mt-3 mt-md-5 row px-3'>
                    <div className='content-left d-none d-md-block col-md-5'>
                        <div className='text-primary h1'>JWT</div>
                        <div className='fs-5'>JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.</div>
                    </div>
                    <div className='content-right col-12 col-md-7'>
                        <div className='bg-white register-box px-3 pt-4 shadow d-flex flex-column gap-3'>
                            <div className='text-primary text-center h1 d-block d-md-none'>JWT</div>
                            <div className='row'>
                                <div className="form-group col-12 mt-2 col-md-6">
                                    <label>Email address</label>
                                    <input name='email' value={formData.email} onChange={handleInputChange} type="email" className={validFormData.validEmail ? "form-control" : "form-control is-invalid"} placeholder="Enter email" />
                                </div>
                                <div className="form-group col-12 mt-2 col-md-6">
                                    <label>Username</label>
                                    <input name='username' value={formData.username} onChange={handleInputChange} type="text" className={validFormData.validUsername ? "form-control" : "form-control is-invalid"} placeholder="Enter username" />
                                </div>
                                <div className="form-group col-12 mt-2 col-md-6">
                                    <label>Password</label>
                                    <input name='password' value={formData.password} onChange={handleInputChange} type="password" className={validFormData.validPassword ? "form-control" : "form-control is-invalid"} placeholder="Enter password" />
                                </div>

                                <div className="form-group col-12 mt-2 col-md-6">
                                    <label>Phone number</label>
                                    <input name='phone' value={formData.phone} onChange={handleInputChange} type="text" className={validFormData.validPhone ? "form-control" : "form-control is-invalid"} placeholder="Enter phone number" />
                                </div>
                                <div className="form-group col-12 mt-2 col-md-6">
                                    <label>Address</label>
                                    <input name='address' value={formData.address} onChange={handleInputChange} type="text" className={validFormData.validAddress ? "form-control" : "form-control is-invalid"} placeholder="Enter address" />
                                </div>
                                <div className="form-group col-12 mt-2 col-md-6">
                                    <label>Gender</label>
                                    <select name='sex' value={formData.sex} onChange={handleInputChange} className="form-select">
                                        <option value={"Male"}>Male</option>
                                        <option value={"Female"}>Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <button onClick={() => handleSignUp()} className='btn btn-primary fs-6 fw-bold'>Sign Up</button>
                            </div>
                            <div className="form-group mb-3">
                                <span onClick={() => handleLoginPage()} className='forgotten-password text-center text-primary'>Already have an account? Log In</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Register;
