class ZyInterface {
  get supperZyzs() {
    return !!window.zyzs;
  }

  /**
   * 获取状态栏信息
   * @returns {Promise<{height: number, darkTheme: boolean}>}
   */
  getStatusBarInfo() {
    if (this.supperZyzs) {
      return ZyInterface._executeInterface('getStatusBarInfo');
    }
    return Promise.resolve({ height: 0, darkTheme: null });
  }

  /**
   * 获取定位信息
   * @param highPrecision 是否高精度（GPS）
   * @returns {Promise<never>|Promise<unknown>|Promise<*>}
   */
  getLocation(highPrecision) {
    if (this.supperZyzs) {
      return ZyInterface._executeInterface('getLocation', { highPrecision });
    } else if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const coords = position.coords;
            resolve({
              latitude: coords.latitude,
              longitude: coords.longitude
            });
          },
          e => reject(new Error(e.message))
        );
      });
    }
    return Promise.reject(new Error('不支持获取定位信息'));
  }

  /**
   * 更新状态栏主题
   * @param params 主题参数，暗色主题下，状态栏文字为白色，否则为灰色 { dark: 是否是暗色主题 }
   * @returns {Promise<void>}
   */
  updateStatusBarTheme(params = { dark: true }) {
    if (this.supperZyzs) {
      return ZyInterface._executeInterface('updateStatusBarTheme', params);
    }
    return Promise.resolve();
  }

  /**
   * 缓存清理
   * @returns {Promise<void>}
   */
  cacheClear() {
    if (this.supperZyzs) {
      return ZyInterface._executeInterface('cacheClear');
    }
    return Promise.resolve();
  }

  /**
   * 打印页面
   * @param documentName
   * @returns {Promise<never>|Promise<*>}
   */
  print(documentName) {
    if (this.supperZyzs) {
      return ZyInterface._executeInterface('print', { documentName });
    } else {
      window.print();
      return Promise.resolve();
    }
  }

  /**
   * 执行封装接口
   * @param interfaceName 接口名称
   * @param param 接口参数
   * @returns {Promise<unknown>}
   * @private
   */
  static _executeInterface(interfaceName, param) {
    return new Promise((resolve, reject) => {
      const callbackName = `CallBack_${new Date().getTime()}`;
      const paramStr = param ? JSON.stringify(param) : null;

      window[callbackName] = result => {
        window[callbackName] = null;
        if (result.code === 0) {
          resolve(result.result);
        } else {
          reject(new Error(result.error));
        }
      };

      window.zyzs.executeInterface(interfaceName, callbackName, paramStr);
    });
  }
}

const zy = new ZyInterface();

export default zy;
