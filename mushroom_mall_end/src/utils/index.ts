import nprogress from 'nprogress';
import { message, Modal, ModalFuncProps } from 'ant-design-vue';
import { NoticeType } from 'ant-design-vue/lib/message';

class CommonUtil {
  // 只读属性规范使用全部大写
  readonly MESSAGE_LOADING_KEY = 882;
  readonly SUCCESS_HAPPY_EMOJi = '🎉';
  readonly #SERVER_PASS_SLAT = '1234567890qwertyuiopmnbvcxzasdfghjklPLMOKNIJBUHVYGCTFXRDZESWAQ';

  // 导航栏请求条，因为在请求和路由切换时都会进行显示，因此进行统一封装
  showNprogress() {
    nprogress.start();
  }
  hideNprogress() {
    nprogress.done();
  }

  // global message method
  showMessage(type: NoticeType, content: string, duration?: number, key?: string | number): void;
  showMessage(type: NoticeType, content: string, duration?: number, key?: string | number, onClose?: () => void): void;
  showMessage(type: NoticeType, content: string, duration = 2, key?: string | number, onClose?: () => void): void {
    message[type]({ content, key, duration, onClose });
  }
  // 上面的方法可以使用一个来代替，直接用可选或默认值即可

  // 模态框工具方法
  public showModal(props: ModalFuncProps) {
    Modal[props.type!]({
      ...props,
      wrapClassName: 'global-modal',
    });
  }

  // 对用户的密码进行加密
  public async encode(raw: string) {
    // 将原密码和 slat 进行拼接
    const slatPass =
      '' +
      this.#SERVER_PASS_SLAT.charAt(8) +
      this.#SERVER_PASS_SLAT.charAt(52) +
      this.#SERVER_PASS_SLAT.charAt(30) +
      raw +
      this.#SERVER_PASS_SLAT.charAt(this.#SERVER_PASS_SLAT.length - 5) +
      this.#SERVER_PASS_SLAT.charAt(2) +
      this.#SERVER_PASS_SLAT.charAt(12);

    // 下面对密码进行加密
    return await this.#encodeUtil('sha-256', slatPass);
  }

  // base64 加密
  public base64(type: 'encode' | 'decode', raw: string) {
    // 对 raw 进行 base64 加密
    if (type === 'encode') {
      // btoa() 对中文的支持不好，当字符串中包含了中文时，会报错，因此先对其进行编码
      return window.btoa(window.encodeURIComponent(raw));
    }
    // 解码后的内容还需要使用 decodeURIComponent() 来进行解码
    return window.decodeURIComponent(window.atob(raw));
  }

  async #encodeUtil(type: string, need: string) {
    const arrayBytes = await crypto.subtle.digest(type, new TextEncoder().encode(need));
    return Array.from(new Uint8Array(arrayBytes))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('');
  }
}

const commonUtil = new CommonUtil();

export default commonUtil;
