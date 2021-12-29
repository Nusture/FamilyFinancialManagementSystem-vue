import request from '@/utils/request';


export const Login = query => {
    return request({
        url: '/doLogin', // 后端提供的接口地址
        method: 'post', // 请求的方法 一般是get 或者post 具体情况具体分析
        params: query // 请求接口需要传递的参数 params  data 
    });
};