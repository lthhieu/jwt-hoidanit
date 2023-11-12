import React, { useRef, useState } from 'react';
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'
import { createProjects } from '../../services/projectService';
import TableProject from './TableProject';
// import { UserContext } from "../../context/UserContext";
const Project = () => {
    // const { user } = useContext(UserContext)
    const childRef = useRef();
    const projectDefault = { name: '', description: '', customerId: null, isValid: true }
    const [listProject, setListProject] = useState({
        child1: projectDefault
    })
    const handleOnChangeInput = (name, value, key) => {
        let _listProject = _.cloneDeep(listProject)
        _listProject[key][name] = value
        setListProject(_listProject)
    }
    const handleAddNewInput = () => {
        let _listProject = _.cloneDeep(listProject)
        _listProject[`child-${uuidv4()}`] = projectDefault
        setListProject(_listProject)
    }
    const handleDeleteInputRole = (id) => {
        let _listProject = _.cloneDeep(listProject)
        delete _listProject[id]
        setListProject(_listProject)
    }
    const buildDataToPersist = () => {
        let _listProject = _.cloneDeep(listProject)
        const outputArray = Object.entries(_listProject).map(([key, value]) => {
            const { name, description } = value
            return { name, description }
        })
        return outputArray
    }
    const handleSave = async () => {

        //reset invalid
        Object.entries(listProject).map(([key, child], index) => { child.isValid = true })
        //find invalid input
        let invalid = Object.entries(listProject).find(([key, value], index) => !value.name)
        if (!invalid) {

            //build data
            let data = buildDataToPersist()
            let response = await createProjects(data)
            if (+response.ec === 0) {
                //reset input role
                setListProject({
                    child1: projectDefault
                })
                toast.success(response?.em)
                childRef.current.fetchAllProjectsAgain()

            } else {
                toast.error(response?.em)
            }
        } else {
            //handle error
            toast.error(`Project's name is not empty!`)
            let _listProject = _.cloneDeep(listProject)
            _listProject[invalid[0]]['isValid'] = false
            setListProject(_listProject)
        }
    }
    return (
        <div className='container mt-3'>
            <div className='row'>
                <div><h3>Create New Projects</h3></div>
                <div className='project-parents'>
                    {Object.entries(listProject).map(([key, child], index) => {
                        return (
                            <div className='project-child row mt-md-2' key={`project-${key}`}>
                                <div className="form-group col-12 col-md-5">
                                    <label>Name</label>
                                    <input onChange={(e) => { handleOnChangeInput('name', e.target.value, key) }} value={child.name} type="text" className={child.isValid ? "form-control" : "form-control is-invalid"} placeholder="Enter name" />
                                </div>
                                <div className="form-group col-12 col-md-5 mt-3 mt-md-0">
                                    <label>Description</label>
                                    <input onChange={(e) => { handleOnChangeInput('description', e.target.value, key) }} value={child.description} type="text" className="form-control" placeholder="Enter description" />
                                </div>
                                <div className='col-12 col-md-2 mt-2 mt-md-0 d-flex align-items-md-end gap-3'>
                                    <i onClick={() => handleAddNewInput()} role="button" className="text-success fa-2x fa fa-plus-square-o" aria-hidden="true"></i>
                                    {index >= 1 && <i onClick={() => handleDeleteInputRole(key)} role="button" className="fa fa-eraser fa-2x text-danger" aria-hidden="true"></i>}
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div>
                    <button onClick={() => handleSave()} className='btn btn-primary mt-3'>Save</button>
                </div>
            </div>
            <TableProject ref={childRef} />
        </div>
    );
};

export default Project;