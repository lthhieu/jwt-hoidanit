import axios from '../setup/axios'
const register = (data) => {
    return axios.post("/register", data)
}
const createUser = (data) => {
    return axios.post("/user/create", data)
}
const login = (data) => {
    return axios.post("/login", data)
}
const logOut = () => {
    return axios.post("/logout")
}
const fetchUsers = (page, limit) => {
    return axios.get(`/user/read?page=${page}&limit=${limit}`)
}
const deleteUser = (id) => {
    return axios.delete('/user/delete', { data: { id } })
}
const getUserAccount = () => {
    return axios.get('/account')
}
const updateUser = (data) => {
    return axios.put('/user/update', data)
}
export { register, login, fetchUsers, deleteUser, getUserAccount, logOut, updateUser, createUser }