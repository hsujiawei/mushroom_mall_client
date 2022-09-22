import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { HttpBaseConfig } from '@/config';
import commonUtils from '@/utils';

// 对 Axios 进行封装

class Http {
  #instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    console.log('Htpp 构造器中： ', config);
    this.#instance = axios.create(config);
    this.#instance.interceptors.request.use(this.#requestInterceptor);
    this.#instance.interceptors.response.use(this.#responseInterceptor);
  }

  // 请求拦截器
  // 执行拦截器之后需要将原本的东西返回，否则不能正常进行请求/获取响应
  #requestInterceptor(config: AxiosRequestConfig) {
    commonUtils.showNprogress();
    console.log('请求拦截器执行, 请求 baseUrl: ', config.baseURL);
    console.log('请求拦截器执行, 请求路径: ', config.url);
    return config;
  }
  // 响应拦截器
  #responseInterceptor(response: AxiosResponse) {
    commonUtils.hideNprogress();
    console.log('响应拦截器运行');
    return response;
  }

  async #request(config: AxiosRequestConfig) {
    return await this.#instance.request(config);
  }

  // 添加公用的 RESTful 方法
  async get(url: string) {
    //  params?: any
    return await this.#request({ url, method: 'get' });
  }
  async post(url: string, data: any) {
    return await this.#request({ url, data, method: 'post' });
  }
  async put(url: string, data: any) {
    return await this.#request({ url, data, method: 'put' });
  }
  async delete(url: string, params: any) {
    return await this.#request({ url, params, method: 'delete' });
  }
}

const http = new Http({ ...HttpBaseConfig });

export default http;
