import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter(
  {
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/Home.vue'),
        redirect: '/quote-input',
        children: [
          {
            path: 'quote-input',
            name: 'QuoteInput',
            component: () => import('../views/QuoteInput.vue')
          },
          {
            path: 'images-selection',
            name: 'ImagesSelection',
            component: () => import('../views/ImagesSelection.vue')
          },
          {
            path: 'source-input',
            name: 'SourceInput',
            component: () => import('../views/SourceInput.vue')
          }
        ]
      },
      {
        path: '/:catchAll(.*)',
        redirect: { name: 'QuoteInput' }
      }
    ]
  }
)
