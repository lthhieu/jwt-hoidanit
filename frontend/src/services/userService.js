import axios from '../setup/axios'
const register = (data) => {
    return axios.post("/register", data)
}
const login = (data) => {
    return axios.post("/login", data)
}
const fetchUsers = (page, limit) => {
    return axios.get(`/user/read?page=${page}&limit=${limit}`)
}
const deleteUser = (id) => {
    return axios.delete('/user/delete', { data: { id } })
}
export { register, login, fetchUsers, deleteUser }