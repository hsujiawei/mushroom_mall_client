import { http } from '@/network/index';
class CommonService {
  readonly BASE64_IMAGE_PREFIX = 'data:image/png;base64,';
  readonly #COMMON_SERVICE_URL_PREFIX = '/common';
  async getBase64Image(url: string) {
    console.log('this.#COMMON_SERVICE_URL_PREFIX + url: ', this.#COMMON_SERVICE_URL_PREFIX + url);
    return await http.get(this.#COMMON_SERVICE_URL_PREFIX + url, { code: 212 }, false);
  }

  async verifyCode(url: string, code: string) {
    return await http.post(this.#COMMON_SERVICE_URL_PREFIX + url, { code }, false);
  }

  async getUploadSecure(url: string) {
    return await http.get(this.#COMMON_SERVICE_URL_PREFIX + url, undefined, false);
  }
  async postUpload(url: string, data: any) {
    return await http.post(url, data, true, { withCredentials: false, headers: { 'Content-Type': 'multipart/form-data' } });
  }
}

const commonService = new CommonService();

export default commonService;
