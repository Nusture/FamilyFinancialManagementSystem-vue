import axios from 'axios';
import qs from 'qs';
import {
    useRouter
} from 'vue-router';
import {
    getToken,
    removeToken
} from '@/utils/auth';
import url from './requestConfig'
import {
    ElMessageBox,
    ElMessage
} from 'element-plus'
let urls = ''
if (window.location.hostname === 'localhost') {
    urls = 'http://47.107.103.82:8081'
} else {
    urls = '/api'
}
const router = useRouter();
export const baseURL = '/api';
const service = axios.create({
    baseURL,
    timeout: 60000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // Host: '47.107.103.82: 8081'
    },
    validateStatus: status => status === 200 || status === 401
});

service.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.token = `${token}`;
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

// 响应
service.interceptors.response.use(response => {
    const data = response.data;
    if (data.code !== 200) {
        if (data.code === 401) {
            // ElMessageBox.use;
            ElMessage({
                message: '您已注销,需要重新登陆',
                type: 'waring',
                duration: 3 * 1000
            })
            removeToken();
            // onRefresh()
            location.reload()
            router.push('/login');
        } else if (data.code === 500) {
            // ElMessage.error(data.msg)
        } else {
            ElMessage({
                message: data.msg || 'Error',
                type: 'waring',
                duration: 3 * 1000
            })
        }
    }
    return data;
});

const http = {};

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.get = function (url, params) {
    return new Promise((resolve, reject) => {
        service
            .get(url, {
                params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(e => {
                reject(e.data);
            });
    });
};

// /**
//  * post方法，对应post请求
//  * @param {String} url [请求的url地址]
//  * @param {Object} params [请求时携带的参数]
//  */

http.post = function (url, params) {
    return new Promise((resolve, reject) => {
        service
            .post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(e => {
                reject(e.data);
            });
    });
};

export default service;