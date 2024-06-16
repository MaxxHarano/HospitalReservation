import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.headers.common['Authorization'] = `auth-token=${Cookies.get('auth-token')}`;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  })
export default axios.create({
    baseURL: 'http://localhost:8080',
    // withCredentials: true,
});