import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
import registerAntDesign from '@/ant-design';
import pinia from '@/store';
import router from '@/router';
import 'nprogress/nprogress.css';
import commonUtil from './utils';
import { http } from './network';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(registerAntDesign);
app.mount('#app');

// const base = commonUtil.base64('encode', '你好啊');
// console.log('base64: ', base);
// console.log('base64 解码: ', commonUtil.base64('decode', base));
