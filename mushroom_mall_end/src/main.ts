import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import registerAntDesign from './ant-design';
import pinia from './store';

const app = createApp(App);

app.use(pinia);
app.use(registerAntDesign);
app.mount('#app');
