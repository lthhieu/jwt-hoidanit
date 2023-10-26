import React, { useState, useEffect } from 'react';
import { fetchGroups } from '../../services/groupService'
import { toast } from 'react-toastify';
import { fetchAllRolesService, fetchAllRolesByGroupidService, assignRoleToGroup } from '../../services/roleService'
import _ from 'lodash'
const GroupRole = () => {
    const [groupName, setGroupName] = useState([])
    const [selectGroupid, setSelectGroupid] = useState("")
    const [roles, setRoles] = useState([])
    const [roleAssignGroup, setRoleAssignGroup] = useState([])
    useEffect(() => {
        getGroupName()
        fetchAllRoles()
    }, [])
    const getGroupName = async () => {
        let response = await fetchGroups()
        if (+response?.ec === 0) {
            setGroupName(response?.dt)
        } else {
            toast.error(response?.em)
        }
    }
    const fetchAllRoles = async () => {
        let response = await fetchAllRolesService()
        if (+response?.ec === 0) {
            setRoles(response?.dt)
        }
    }
    const handleOnChangeSelect = async (e) => {
        setSelectGroupid(e)
        if (e) {
            let response = await fetchAllRolesByGroupidService(e)
            if (+response?.ec === 0) {
                let roleBelongGroup = response?.dt?.Roles
                let resultArray = roles.length > 0 && roles.map(item => ({
                    ...item,
                    assigned: !!roleBelongGroup.find(elem => elem.url === item.url)
                }));
                setRoleAssignGroup(resultArray)
            }
        }
    }
    const handleOnChangeSelectRole = (e) => {
        let _roleAssignGroup = _.cloneDeep(roleAssignGroup)
        _roleAssignGroup.map(item => {
            if (item.id === +e) {
                item.assigned = !item.assigned
            }
        });
        setRoleAssignGroup(_roleAssignGroup)
    }
    const handleSave = async () => {
        //filter
        let filterAssign = roleAssignGroup.filter(item => item.assigned)
        let dataArrayFinalResult = filterAssign.map((item) => {
            let data = { groupId: +selectGroupid, roleId: item.id }
            return data
        })
        let dataToSave = { groupId: +selectGroupid, data: dataArrayFinalResult }

        let response = await assignRoleToGroup(dataToSave)
        if (+response?.ec === 0) {
            toast.success(response?.em)
        } else {
            toast.error(response?.em)
        }
    }
    return (
        <div className='container mt-3'>
            <div className="form-group col-12 mt-2 col-md-6">
                <label><h4>Select a Group</h4></label>
                <select onChange={(e) => handleOnChangeSelect(e.target.value)} className="form-select mt-1">
                    <option value="">Choose group</option>
                    {groupName?.length > 0 && <>{groupName.map((item, index) => {
                        return (<option key={`group-${index}`} value={item.id}>{item.name}</option>)
                    })}</>}
                </select>
            </div>
            <hr />{selectGroupid ? <div>
                <h5>Assign roles</h5>
                {roleAssignGroup?.length > 0 && roleAssignGroup.map((item, index) => {
                    return (<div key={`key-${index}`} className="form-check my-2">
                        <input onChange={(e) => handleOnChangeSelectRole(e.target.value)} role='button' className="form-check-input" type="checkbox" checked={item?.assigned ? true : false} value={item?.id} id={item?.id} />
                        <label role='button' className="form-check-label" htmlFor={item?.id}>
                            {item?.url}
                        </label>
                    </div>)
                })}
                <div><button onClick={() => handleSave()} className='btn btn-primary'>Save</button></div>
            </div> : <></>}

        </div>
    );
};

export default GroupRole;