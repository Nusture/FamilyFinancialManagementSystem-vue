import request from '@/utils/request';


export const Login = query => {
    return request({
        url: '/doLogin', // 后端提供的接口地址
        method: 'post', // 请求的方法 一般是get 或者post 具体情况具体分析
        params: query // 请求接口需要传递的参数 params  data 
    });
};
// 注册
export const Register = query => {
    return request({
        url: '/doRegister',
        method: 'post',
        params: query
    });
};
// 查询用户名是否存在
export const getUsername = query => {
    return request({
        url: '/getUsername',
        method: 'post',
        param: query
    });
};
// 获取当日收支接口
export const getToday = query => {
    return request({
        url: '/user/today',
        method: 'post',
        params: query
    });
};

// 修改密码
export const changePassword = query => {
    return request({
        url: '/user/getPassword',
        method: 'post',
        params: query
    });
};
// 个人信息
export const getUserInfo = (data) => {
    return request({
        url: '/user/getUserById',
        method: 'get',
        data,
        // config: {
        //     headers: {
        //         'Request-Type': 'wechat'
        //     },
        //     timeout: 10000
        // }
    });
};
// 个人信息
export const getUserInfos = params => {
    return request({
        url: '/user/getUserById',
        method: 'get',
        params
    });
};