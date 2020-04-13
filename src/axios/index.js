import axios from 'axios';
import qs from 'qs';
const config = {
    baseURL: '/api',
    transformRequest: [
        function(data) {
            let ret = '';
            for(let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }
    ],
    transformResponse: [
        function(data) {
            return data
        }
    ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout: 10000,
    response: 'json'
};

axios.interceptors.response.use(function(res) {
    //相应拦截器
    return res.data;
});

export function get(url) {
    return axios.get(url,config);
}
export function post(url,data) {
    return axios.post(url,data,config);
}