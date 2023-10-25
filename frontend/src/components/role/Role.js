import React, { useRef, useState } from 'react';
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'
import { createRoles } from '../../services/roleService';
import TableRole from './TableRole';
const Role = () => {
    const childRef = useRef();
    const roleDefault = { url: '', description: '', isValid: true }
    const [listRole, setListRole] = useState({
        child1: roleDefault
    })
    const handleOnChangeInput = (name, value, key) => {
        let _listRole = _.cloneDeep(listRole)
        _listRole[key][name] = value
        setListRole(_listRole)
    }
    const handleAddNewInput = () => {
        let _listRole = _.cloneDeep(listRole)
        _listRole[`child-${uuidv4()}`] = roleDefault
        setListRole(_listRole)
    }
    const handleDeleteInputRole = (id) => {
        let _listRole = _.cloneDeep(listRole)
        delete _listRole[id]
        setListRole(_listRole)
    }
    const buildDataToPersist = () => {
        let _listRole = _.cloneDeep(listRole)
        const outputArray = Object.entries(_listRole).map(([key, value]) => {
            const { url, description } = value
            return { url, description }
        })
        return outputArray
    }
    const handleSave = async () => {
        //reset invalid
        Object.entries(listRole).map(([key, child], index) => { child.isValid = true })
        //find invalid input
        let invalid = Object.entries(listRole).find(([key, value], index) => !value.url)
        if (!invalid) {

            //build data
            let data = buildDataToPersist()
            let response = await createRoles(data)
            if (+response.ec === 0) {
                //reset input role
                setListRole({
                    child1: roleDefault
                })
                childRef.current.fetchAllRolesAgain()
                toast.success(response?.em)
            } else {
                toast.error(response?.em)
            }
        } else {
            //handle error
            toast.error('Url is not empty!')
            let _listRole = _.cloneDeep(listRole)
            _listRole[invalid[0]]['isValid'] = false
            setListRole(_listRole)
        }
    }
    return (
        <div className='container mt-3'>
            <div className='row'>
                <div><h3>Create New Roles</h3></div>
                <div className='role-parents'>
                    {Object.entries(listRole).map(([key, child], index) => {
                        return (
                            <div className='role-child row mt-md-2' key={`role-${key}`}>
                                <div className="form-group col-12 col-md-5">
                                    <label>URL</label>
                                    <input onChange={(e) => { handleOnChangeInput('url', e.target.value, key) }} value={child.url} type="text" className={child.isValid ? "form-control" : "form-control is-invalid"} placeholder="Enter url" />
                                </div>
                                <div className="form-group col-12 col-md-5 mt-3 mt-md-0">
                                    <label>Description</label>
                                    <input onChange={(e) => { handleOnChangeInput('description', e.target.value, key) }} value={child.description} type="text" className="form-control" placeholder="Enter desciption" />
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
            <TableRole ref={childRef} />
        </div>
    );
};

export default Role;