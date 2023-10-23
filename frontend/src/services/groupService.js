import axios from '../setup/axios';

const fetchGroups = (page, limit) => {
    return axios.get(`/group/read`)
}

export { fetchGroups }