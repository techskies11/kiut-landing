import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.language || 'es',
  fallbackLocale: 'es',
  messages: {
    es,
    en
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
