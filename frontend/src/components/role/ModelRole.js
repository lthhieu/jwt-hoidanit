import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { updateRole } from '../../services/roleService';
const ModelRole = (props) => {
    let { show, handleClose, roleData, fetchAllRoles } = props
    const defaultData = {
        url: 'url',
        description: 'des'
    }
    const defaultValid = {
        validUrl: true,
        validDescription: true
    }
    useEffect(() => {
        setFormData(roleData)
    }, [roleData])
    useEffect(() => {
        setFormData(roleData)
    }, [show])
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
        let { url, description } = formData
        const validateRules = [
            { condition: !url, msg: 'Url is required', validError: 'validUrl' },
            { condition: !description, msg: 'Description is not valid', validError: 'validDescription' }
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
    const handleUpdateRole = async () => {
        let roleDataToSubmit = formData
        if (validate()) {
            delete roleDataToSubmit?.Groups;
            let respone = await updateRole(roleDataToSubmit)
            if (+respone?.ec === 0) {
                toast.success(respone?.em)
                fetchAllRoles()
                setFormData(defaultData)
                setValidFormData(defaultValid)
                handleClose()
            } else {
                toast.error(respone?.em)
            }
        }
    }
    return (
        <Modal size='lg' show={show} onHide={() => {
            setFormData(defaultData)
            setValidFormData(defaultValid)
            handleClose()
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Update role info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className="form-group col-12 mt-2 col-md-6">
                        <label>Url</label>
                        <input onChange={(e) => handleInputChange(e)} name='url' type="text" value={formData.url} className={validFormData.validUrl ? "form-control" : "form-control is-invalid"} placeholder="Enter Url" />
                    </div>
                    <div className="form-group col-12 mt-2 col-md-6">
                        <label>Description</label>
                        <input onChange={(e) => handleInputChange(e)} name='description' value={formData.description} type="text" className={validFormData.validDescription ? "form-control" : "form-control is-invalid"} placeholder="Enter Description" />
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
                <Button variant="primary" onClick={() => { handleUpdateRole() }}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModelRole;