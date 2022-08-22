import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.css';
import router from './router/router';
import { createPinia } from 'pinia';

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
