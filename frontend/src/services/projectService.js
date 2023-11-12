import axios from '../setup/axios';

const createProjects = (data) => {
    return axios.post('/project/create', [...data])
}
const fetchProjects = (page, limit) => {
    return axios.get(`/project/read?page=${page}&limit=${limit}`)
}
const fetchAllProjectsService = () => {
    return axios.get(`/project/read`)
}
const deleteProject = (id) => {
    return axios.delete('/project/delete', { data: { id } })
}
const fetchAllProjectsByGroupidService = (groupid) => {
    return axios.get(`/project/read-by-groupid?groupid=${groupid}`)
}
const assignprojectToGroup = (data) => {
    return axios.post("/project/assign-group", data)
}
const updateProject = (data) => {
    return axios.put("/project/update", data)
}

export { createProjects, fetchProjects, deleteProject, fetchAllProjectsService, fetchAllProjectsByGroupidService, assignprojectToGroup, updateProject }