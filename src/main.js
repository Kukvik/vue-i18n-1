import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

// Импорт языковых файлов
import enMessages from './locales/en.json'
import ruMessages from './locales/ru.json'
import esMessages from './locales/es.json'

// Создание i18n инстанса
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('fitness-locale') || 'ru',
  fallbackLocale: 'en',
  messages: {
    en: enMessages,
    ru: ruMessages,
    es: esMessages
  }
})

createApp(App).use(i18n).mount('#app')