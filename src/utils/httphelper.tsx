import axios from 'axios'
import LocalStorageService from '../services/LocalStorageService'
import { history } from "../index";
import { openNotificationWith } from './notification';

const configs = {
    apiUrl: process.env.REACT_APP_BASE_API_URL
}

const localStorageService = LocalStorageService.getService();


axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();

axios.interceptors.request.use(
    async (config:any) => {
        if (config.headers === undefined) {
            config.headers = {};
          }
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });


axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;
    if (error.response) {
        if (error.response.status === 401 && originalRequest.url === `${configs.apiUrl}/api​/token​/`) {
            history.push('/login');
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;
            const refreshToken = localStorageService.getRefreshToken();
            return axios.post(`${configs.apiUrl}/api​/token​/refresh`,
                {
                    "refresh_token": refreshToken
                })
                .then(res => {
                    if (res.status === 201) {
                        localStorageService.setToken(res.data);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                        return axios(originalRequest);
                    }
                })
        }else if(error.response.status===404){
           console.error('Hata')
        }
    }

    return Promise.reject(error);
});



const url = (endpoint: string) => {
    return `${configs.apiUrl}${endpoint}`
}


export async function post(endpoint: string, data: object) {
    const reqUrl = url(endpoint)
    return axios.post(reqUrl, data)
        .then(res => res)
        .catch(error =>  error.response);
}
export async function get(endpoint: string) {
    const reqUrl = url(endpoint)
    return await axios.get(reqUrl)
        .then(res => res)
        .catch(error => error.response)

}
export async function put(endpoint: string, data: object) {
    const reqUrl = url(endpoint)
    return await axios.put(reqUrl, data)
        .then(res => res)
        .catch(error =>  error.response)

}
export async function deletereq(endpoint: string, data: object) {
    const reqUrl = url(endpoint)
    return axios.delete(reqUrl, data)
        .then(res => res)
        .catch(error =>  error.response);
}
