import { createRouter, createWebHistory } from 'vue-router'
import SelectAvailability from '../views/SelectAvailability.vue'
import CalendarList from '../views/CalendarList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'select availability',
      component: SelectAvailability
    },
    {
      path: '/list',
      name: 'calendr list',
      component: CalendarList
    }
  ]
})

export default router
