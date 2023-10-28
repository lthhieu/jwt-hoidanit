import axios from '../setup/axios';

const createRoles = (data) => {
    return axios.post('/role/create', [...data])
}
const fetchRoles = (page, limit) => {
    return axios.get(`/role/read?page=${page}&limit=${limit}`)
}
const fetchAllRolesService = () => {
    return axios.get(`/role/read`)
}
const deleteRole = (id) => {
    return axios.delete('/role/delete', { data: { id } })
}
const fetchAllRolesByGroupidService = (groupid) => {
    return axios.get(`/role/read-by-groupid?groupid=${groupid}`)
}
const assignRoleToGroup = (data) => {
    return axios.post("/role/assign-group", data)
}
const updateRole = (data) => {
    return axios.put("/role/update", data)
}

export { createRoles, fetchRoles, deleteRole, fetchAllRolesService, fetchAllRolesByGroupidService, assignRoleToGroup, updateRole }