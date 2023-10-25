import axios from '../setup/axios';

const createRoles = (data) => {
    return axios.post('/role/create', [...data])
}

export { createRoles }