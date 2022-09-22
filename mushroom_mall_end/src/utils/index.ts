import nprogress from 'nprogress';

class CommonUtils {
  // 导航栏请求条，因为在请求和路由切换时都会进行显示，因此进行统一封装
  showNprogress() {
    nprogress.start();
  }
  hideNprogress() {
    nprogress.done();
  }
}

const commonUtils = new CommonUtils();

export default commonUtils;
