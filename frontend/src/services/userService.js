import axios from '../setup/axios'
const register = (data) => {
    return axios.post("/register", data)
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
export { register, login, fetchUsers, deleteUser, getUserAccount, logOut }