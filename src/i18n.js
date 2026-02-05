import { createI18n } from 'vue-i18n'

// Простые сообщения для начала
const messages = {
  en: {
    app: {
      title: 'Multilingual Todo List',
      subtitle: 'Manage your tasks in any language'
    },
    todo: {
      add: 'Add Task',
      placeholder: 'What needs to be done?',
      empty: 'No tasks yet. Add one!',
      delete: 'Delete',
      clear: 'Clear Completed'
    },
    filter: {
      all: 'All',
      active: 'Active',
      completed: 'Completed'
    },
    language: 'Language'
  },
  ru: {
    app: {
      title: 'Многоязычный Список Задач',
      subtitle: 'Управляйте задачами на любом языке'
    },
    todo: {
      add: 'Добавить Задачу',
      placeholder: 'Что нужно сделать?',
      empty: 'Задач пока нет. Добавьте первую!',
      delete: 'Удалить',
      clear: 'Очистить Выполненные'
    },
    filter: {
      all: 'Все',
      active: 'Активные',
      completed: 'Выполненные'
    },
    language: 'Язык'
  },
  es: {
    app: {
      title: 'Lista de Tareas Multilingüe',
      subtitle: 'Gestiona tus tareas en cualquier idioma'
    },
    todo: {
      add: 'Añadir Tarea',
      placeholder: '¿Qué hay que hacer?',
      empty: 'No hay tareas todavía. ¡Añade una!',
      delete: 'Eliminar',
      clear: 'Limpiar Completadas'
    },
    filter: {
      all: 'Todas',
      active: 'Activas',
      completed: 'Completadas'
    },
    language: 'Idioma'
  }
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'ru',
  fallbackLocale: 'en',
  messages
})

export default i18n