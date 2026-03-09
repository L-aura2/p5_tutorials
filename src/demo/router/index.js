import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/demo', component: () => import('@/views/demoView.vue'),
    }
  ],
})
export default router
