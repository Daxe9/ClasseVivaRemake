import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import {createPinia} from 'pinia'
import { loadFonts } from './plugins/webfontloader'
import './assets/base.css'
import './assets/main.css'

loadFonts()
const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')
