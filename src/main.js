import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './css/base.css'
import '@/assets/iconfont/iconfont.css';
import App from './App.vue'
import router from './router'
import {paintBorder} from '@/utils/directive/borderImage.js'
import './utils/markdown/hljs.js'
import './utils/console/char.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('border-image', {
  mounted(el){
    paintBorder(el)
  }
});
app.mount('#app')