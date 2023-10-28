import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetchGroups } from '../../services/groupService'
import { createUser, updateUser } from '../../services/userService';
import { toast } from 'react-toastify';
const ModalUser = (props) => {
    const { userInfoData, actionModal, show, handleClose, fetchAllUsers } = props
    const defaultData = {
        email: '',
        username: '',
        password: '',
        phone: '',
        address: '',
        sex: 'Male',
        groupId: 1
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
    const handleInputChange = (event) => {
        let { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
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
        const validateRulesForUpdate = [
            { condition: !username, msg: 'Username is required', validError: 'validUsername' },
            { condition: !address, msg: 'Address is required', validError: 'validAddress' }
        ]
        if (actionModal === 'CREATE') {
            for (const rule of validateRules) {
                if (rule.condition) {
                    toast.error(rule.msg)
                    let { validError } = rule
                    setValidFormData({ ...defaultValid, [validError]: false })
                    return false
                }
            }
        } else {
            for (const rule of validateRulesForUpdate) {
                if (rule.condition) {
                    toast.error(rule.msg)
                    let { validError } = rule
                    setValidFormData({ ...defaultValid, [validError]: false })
                    return false
                }
            }
        }

        return true
    }
    const handleCreateOrUpdateUser = async () => {
        let userData = formData
        if (validate()) {
            if (actionModal === 'CREATE') {
                let response = await createUser(userData)
                if (response) {
                    if (+response?.ec === 0) {
                        toast.success(response?.em)
                        setFormData(defaultData)
                        handleClose()
                        await fetchAllUsers()
                    }
                    else toast.error(response?.em)
                }
            } else {
                console.log(userData)
                let response = await updateUser(userData)
                if (response) {
                    if (+response?.ec === 0) {
                        toast.success(response?.em)
                        setFormData(defaultData)
                        handleClose()
                        await fetchAllUsers()
                    }
                    else toast.error(response?.em)
                }
            }

        }
    }
    const [groupName, setGroupName] = useState([])
    useEffect(() => {
        getGroupName()
    }, [])
    useEffect(() => {
        if (actionModal === "UPDATE")
            setFormData(userInfoData)
    }, [userInfoData])
    useEffect(() => {
        if (actionModal === 'CREATE') {
            setFormData(defaultData)
            setValidFormData(defaultValid)
        } else {
            setFormData(userInfoData)
        }
    }, [actionModal])
    useEffect(() => {
        if (actionModal === 'CREATE') {
            setFormData(defaultData)
            setValidFormData(defaultValid)
        } else {
            setFormData(userInfoData)
        }
    }, [show])
    const getGroupName = async () => {
        let response = await fetchGroups()
        if (+response?.ec === 0) {
            setGroupName(response?.dt)
        } else {
            toast.error(response?.em)
        }
    }
    return (
        <>
            <Modal size='lg' show={show} onHide={() => {
                setFormData(defaultData)
                setValidFormData(defaultValid)
                handleClose()
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{actionModal === 'CREATE' ? 'Create new user' : 'Update user info'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="form-group col-12 mt-2 col-md-6">
                            <label>Email address</label>
                            <input readOnly={actionModal === 'UPDATE' ? true : false} name='email' type="email" value={formData?.email} onChange={handleInputChange} className={validFormData.validEmail ? "form-control" : "form-control is-invalid"} placeholder="Enter email" />
                        </div>
                        <div className="form-group col-12 mt-2 col-md-6">
                            <label>Username</label>
                            <input name='username' value={formData?.username} onChange={handleInputChange} type="text" className={validFormData.validUsername ? "form-control" : "form-control is-invalid"} placeholder="Enter username" />
                        </div>
                        <div className="form-group col-12 mt-2 col-md-6">
                            <label>Password</label>
                            <input disabled={actionModal === 'UPDATE' ? true : false} name='password' value={formData?.password} onChange={handleInputChange} type="password" className={validFormData.validPassword ? "form-control" : "form-control is-invalid"} placeholder="Enter password" />
                        </div>

                        <div className="form-group col-12 mt-2 col-md-6">
                            <label>Phone number</label>
                            <input readOnly={actionModal === 'UPDATE' ? true : false} name='phone' value={formData?.phone} onChange={handleInputChange} type="text" className={validFormData.validPhone ? "form-control" : "form-control is-invalid"} placeholder="Enter phone number" />
                        </div>
                        <div className="form-group col-12 mt-2">
                            <label>Address</label>
                            <input name='address' value={formData?.address} onChange={handleInputChange} type="text" className={validFormData.validAddress ? "form-control" : "form-control is-invalid"} placeholder="Enter address" />
                        </div>
                        <div className="form-group col-12 mt-2 col-md-6">
                            <label>Gender</label>
                            <select name='sex' value={formData?.sex} onChange={handleInputChange} className="form-select">
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                            </select>
                        </div>
                        <div className="form-group col-12 mt-2 col-md-6">
                            <label>Group</label>
                            <select name='groupId' value={formData?.groupId} onChange={handleInputChange} className="form-select">
                                {groupName?.length > 0 && <>{groupName.map((item, index) => {
                                    return (<option key={`group-${index}`} value={item.id}>{item.name}</option>)
                                })}</>}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setFormData(defaultData)
                        setValidFormData(defaultValid)
                        handleClose()
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateOrUpdateUser()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUser;