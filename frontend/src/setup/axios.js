import axios from 'axios';
import { toast } from 'react-toastify'

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
});

instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  console.log("error", error.response)
  const status = error?.response?.status || 500
  switch (status) {
    //authentication
    case 401: {
      // toast.error('No authentication')
      return error?.response?.data
    }
    //no permission  - forbidden
    case 403: {
      toast.error('No permission')
      return error?.response?.data
    }
    case 400: {
      toast.error('Bad request')
      return error?.response?.data
    }
  }
});

export default instance