import commonUtil from '..';
class LocalStoreUtil {
  public readonly TOKEN_KEY = 'token';
  public readonly USER_KEY = 'user';
  // 获取
  get(key: string) {
    const rawValue = localStorage.getItem(key);
    // 先判断值存不存在
    if (!rawValue) return null;

    // 先进行解码，然后再解析成 json
    return window.JSON.parse(commonUtil.base64('decode', rawValue));
  }

  // 增加
  set(key: string, value: string) {
    // 先将 value 格式化为 json
    const jsonVal = window.JSON.stringify(value);
    // 对 value 进行 base64 编码加密后再存放到本地存储
    localStorage.setItem(key, commonUtil.base64('encode', jsonVal));
  }

  // 移除
  remove(...keys: string[]) {
    if (keys && keys.length > 0) keys.forEach((k) => localStorage.removeItem(k));
  }
}

const localStoreUtil = new LocalStoreUtil();

export default localStoreUtil;
