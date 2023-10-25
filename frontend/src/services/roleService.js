import axios from '../setup/axios';

const createRoles = (data) => {
    return axios.post('/role/create', [...data])
}
const fetchRoles = (page, limit) => {
    return axios.get(`/role/read?page=${page}&limit=${limit}`)
}
const deleteRole = (id) => {
    return axios.delete('/role/delete', { data: { id } })
}

export { createRoles, fetchRoles, deleteRole }