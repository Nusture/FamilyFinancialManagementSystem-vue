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
export const getUsername = params => {
    return request({
        url: '/getUsername',
        method: 'post',
        params
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
export const changePassword = data => {
    return request({
        url: '/user/changePassword',
        method: 'post',
        data
    });
};
// 个人信息
export const getUserInfos = data => {
    return request({
        url: '/user/getUserById',
        method: 'post',
        data
    });
};
// 修改个人信息
export const changeUserInfos = data => {
    return request({
        url: '/user/changeUser',
        method: 'post',
        data
    });
};
// 家庭信息 获取家庭码和余额
export const familyInfo = data => {
    return request({
        url: '/user/getFCMoney',
        method: 'post',
        data
    });
};
// 家庭信息 家庭成员
export const familyMember = data => {
    return request({
        url: '/user/getAllUser',
        method: 'post',
        data
    });
};
// 支出管理 查询所以支出条目
export const getOutlaylist = data => {
    return request({
        url: '/cost/getCost',
        method: 'post',
        data
    });
};
// 支出管理 条目详情
export const getOutlaylistDetail = data => {
    return request({
        url: '/cost/queryOne',
        method: 'post',
        data
    });
};
// 支出管理 条目修改 添加
export const addOutlayDetail = data => {
    return request({
        url: `/cost/${data.id ? 'changeCost' : 'addCost'} `,
        method: 'post',
        data
    });
};
// 支出管理 条目删除
export const delOutlay = data => {
    return request({
        url: '/cost/deleteCost',
        method: 'post',
        data
    });
};
// 收入管理 所有条目
export const getIncomeList = data => {
    return request({
        url: '/income/getIncome',
        method: 'post',
        data
    });
};
// 收入管理 详情
export const getIncomeDetail = data => {
    return request({
        url: '/income/queryOne',
        method: 'post',
        data
    });
};
// 收入管理 条目修改 添加
export const addIncomeDetail = data => {
    return request({
        url: `/income/${data.id ? 'changeIncome' : 'addIncome'} `,
        method: 'post',
        data
    });
};
// 收入管理 条目删除
export const delIncomeDetail = data => {
    return request({
        url: '/income/deleteIncome',
        method: 'post',
        data
    });
};
// 获取密码 
export const getPassword = data => {
    return request({
        url: '/user/getPassword',
        method: 'post',
        data
    });
};
// 堆叠玫瑰图 
export const getRose = data => {
    return request({
        url: '/user/getAllUserCI',
        method: 'post',
        data
    });
};
// 指示卡趋势图 
export const getFunnel = data => {
    return request({
        url: '/user/getAllCI',
        method: 'post',
        data
    });
};
// 分组玫瑰图
export const getOutlay = data => {
    return request({
        url: '/user/costByType',
        method: 'post',
        data
    });
};
// 分组玫瑰图
export const incomeByType = data => {
    return request({
        url: '/user/incomeByType',
        method: 'post',
        data
    });
};
// 支出类别水波图 
export const costByTypeWater = data => {
    return request({
        url: '/user/costByTypeWater',
        method: 'post',
        data
    });
};
// 收入类别水波图
export const incomeByTypeWater = data => {
    return request({
        url: '/user/incomeByTypeWater',
        method: 'post',
        data
    });
};
// 词云
export const wordCloud = data => {
    return request({
        url: '/user/wordCloud',
        method: 'post',
        data
    });
};
// 总资产变化面积图
export const moneyChange = data => {
    return request({
        url: '/user/moneyChange',
        method: 'post',
        data
    });
};
// 收支记录日历
export const commitRecord = data => {
    return request({
        url: '/user/commitRecord',
        method: 'post',
        data
    });
};
// 今日收入支出
export const gettoday = data => {
    return request({
        url: '/user/today',
        method: 'post',
        data
    });
};
// 修改余额
export const changeMoney = data => {
    return request({
        url: '/user/changeMoney',
        method: 'post',
        data
    });
};