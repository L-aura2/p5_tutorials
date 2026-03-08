import { createRouter, createWebHistory } from 'vue-router'
import Exercise2View from "@/views/Exercise2View.vue";
import HomeView from "@/views/HomeView.vue";
import PackmanView from "@/views/PackmanView.vue";
import SpookView from "@/views/SpookView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: HomeView,
    },
    {
      path: '/exercise-2', component: Exercise2View,
    },
    {
      path: '/packman', component: PackmanView,
    },
    {
      path: "/spook", component: SpookView,
    }
  ],
})

export default router
