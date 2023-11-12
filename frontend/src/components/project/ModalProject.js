import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { updateProject } from '../../services/projectService';
const ModalProject = (props) => {
    let { show, handleClose, projectData, fetchAllProjects } = props
    const defaultData = {
        name: 'name',
        description: 'des'
    }
    const defaultValid = {
        validName: true,
        validDescription: true
    }
    useEffect(() => {
        setFormData(projectData)
    }, [projectData])
    useEffect(() => {
        setFormData(projectData)
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
        let { name, description } = formData
        const validateRules = [
            { condition: !name, msg: 'Name is required', validError: 'validName' },
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
    const handleUpdateProject = async () => {
        let projectDataToSubmit = formData
        if (validate()) {
            let response = await updateProject(projectDataToSubmit)
            if (+response?.ec === 0) {
                toast.success(response?.em)
                fetchAllProjects()
                setFormData(defaultData)
                setValidFormData(defaultValid)
                handleClose()
            } else {
                toast.error(response?.em)
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
                <Modal.Title>Update project info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className="form-group col-12 mt-2 col-md-6">
                        <label>Name</label>
                        <input onChange={(e) => handleInputChange(e)} name='name' type="text" value={formData.name} className={validFormData.validName ? "form-control" : "form-control is-invalid"} placeholder="Enter Name" />
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
                <Button variant="primary" onClick={() => { handleUpdateProject() }}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalProject;