import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "./pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
const el =app.mount('#app')
// console.log(el);
