import http from '@/utils/request';

export default {
  /**
   * 用户登录
   * @param data
   * @returns {AxiosPromise}
   */
  login(data) {
    return http({
      url: '/sys/oauth/login',
      method: 'post',
      data
    });
  },
  /**
   * 修改登录密码
   * @param data
   * @returns {AxiosPromise}
   */
  changePassword(data) {
    return http({
      url: '/sys/oauth/change_password',
      method: 'post',
      data
    });
  },
  /**
   * 用户登出
   */
  logout() {
    return http({
      url: '/sys/oauth/logout',
      method: 'get'
    });
  }
};