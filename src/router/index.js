import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/images-selection',
      name: 'ImagesSelection',
      component: () => import('../views/ImagesSelection.vue')
    },
    {
      path: '/source-input',
      name: 'SourceInput',
      component: () => import('../views/SourceInput.vue')
    }
  ]
})