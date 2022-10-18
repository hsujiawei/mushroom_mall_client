import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { HttpBaseConfig } from '@/config';
import commonUtil from '@/utils';
import { IServerResponse } from '@/types';
import localStoreUtil from '@/utils/store';

// 对 Axios 进行封装
export default class Http {
  // 服务器自行指定的响应成功状态码
  static readonly SUCCESS_CODE = 5200;
  // token 过期的自定义响应码
  static readonly TOKEN_HAS_EXPIRED = -882;
  // 控制是否显示加载框
  static #SHOW_LOADING_MESSAGE = true;
  // OSS 图片前缀
  static readonly OSS_IMAGE_PREFIX = 'https://mushroom-mall.oss-cn-zhangjiakou.aliyuncs.com/';
  // Axios 实例
  #instance: AxiosInstance;

  // 构造器需要传入一个 AxiosRequestConfig 对象
  constructor(config: AxiosRequestConfig) {
    this.#instance = axios.create(config);
    // 设置请求拦截器
    this.#instance.interceptors.request.use(this.#requestInterceptor);
    // 设置响应拦截器
    this.#instance.interceptors.response.use(this.#responseInterceptor);
  }

  // 请求拦截器
  // 执行拦截器之后需要将原本的东西返回，否则不能正常进行请求/获取响应
  #requestInterceptor(config: AxiosRequestConfig) {
    commonUtil.showNprogress(); // 显示加载条
    if (Http.#SHOW_LOADING_MESSAGE) {
      // 如果需要显示加载框，则进行显示，0 代表没有取消时间
      commonUtil.showMessage('loading', '加载中...', 0, commonUtil.MESSAGE_LOADING_KEY);
    }
    // // 从本地存储中获取 token
    const token = localStoreUtil.get('token');
    // // 如果本地存储中有 token，在需要在 Authorization 请求头中携带该 token
    if (token) config.headers!['Authorization'] = token;
    // 设置 Content-Tpye
    config.headers!['Content-Type'] = config.headers!['Content-Type'] || 'application/json;charset=UTF-8';
    config.headers!['Accept'] = 'application/json;charset=UTF-8';
    return config; // 返回配置对象，必须要返回
  }
  // 响应拦截器
  #responseInterceptor(response: AxiosResponse): IServerResponse {
    commonUtil.hideNprogress();

    if (response.status === 200) {
      // 200 表示服务器成功响应
      // 判断响应内容中是否包含 token 过期
      if (response.data.code === Http.TOKEN_HAS_EXPIRED) {
        // 将其从本地存储中删除
        localStoreUtil.remove('token');
      }
      if (response.headers.authorization) {
        // 如果响应头携带了 authorization
        // authorization 代表服务器对 token 进行续签
        console.log('有 authorization 请求头，值为：', response.headers.authorization);
        localStoreUtil.remove(localStoreUtil.TOKEN_KEY);
        localStoreUtil.set(localStoreUtil.TOKEN_KEY, response.headers.authorization);
      }
      return response.data; // 返回服务器响应的数据
    }
    throw new Error(response.status + ': ' + response.statusText); // status 为其它的所有情况都抛出异常

    // return response;
  }

  async #request(config: AxiosRequestConfig): Promise<IServerResponse | undefined> {
    // request() 方法是最终的请求方法，需要在这对其进行异常捕获
    // 例如网络错误等
    try {
      return await this.#instance.request(config);
    } catch (err: any) {
      const axiosError = err as AxiosError; // 转换为 Axios 的错误
      // 对请求可能出现的错误情况进行处理
      switch (axiosError.code) {
        case AxiosError.ERR_BAD_REQUEST: {
          commonUtil.hideNprogress();
          commonUtil.showMessage('error', '请求资源不存在', undefined, commonUtil.MESSAGE_LOADING_KEY);
          break;
        }
        case AxiosError.ERR_NETWORK: {
          commonUtil.showMessage('error', '网络异常', undefined, commonUtil.MESSAGE_LOADING_KEY);
        }
      }
    }
  }

  // 添加公用的 RESTful 方法
  async get(url: string, params?: any, showLoadingMessage = true): Promise<IServerResponse> {
    Http.#SHOW_LOADING_MESSAGE = showLoadingMessage;
    return (await this.#request({ url, params, method: 'get' }))!;
  }
  async post(
    url: string,
    data: any,
    showLoadingMessage = true,
    config?: {
      withCredentials?: boolean;
      headers: {
        'Content-Type': string;
      };
    }
  ): Promise<IServerResponse> {
    Http.#SHOW_LOADING_MESSAGE = showLoadingMessage;
    return (await this.#request({ url, data, method: 'post', ...config }))!;
  }
  async put(url: string, data: any, showLoadingMessage = true): Promise<IServerResponse> {
    Http.#SHOW_LOADING_MESSAGE = showLoadingMessage;
    return (await this.#request({ url, data, method: 'put' }))!;
  }
  async delete(url: string, data: any, showLoadingMessage = true): Promise<IServerResponse> {
    Http.#SHOW_LOADING_MESSAGE = showLoadingMessage;
    return (await this.#request({ url, data, method: 'delete' }))!;
  }
  // 局部更新
  async patch(url: string, data: any, showLoadingMessage = true): Promise<IServerResponse> {
    Http.#SHOW_LOADING_MESSAGE = showLoadingMessage;
    return (await this.#request({ url, data, method: 'patch' }))!;
  }
}

export const http = new Http({ ...HttpBaseConfig });
