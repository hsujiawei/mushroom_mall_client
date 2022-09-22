import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
import registerAntDesign from '@/ant-design';
import pinia from '@/store';
import router from '@/router';
import 'nprogress/nprogress.css';
import http from './network';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(registerAntDesign);
app.mount('#app');

// 测试请求
http.get('/test');

