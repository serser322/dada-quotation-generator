import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/dada-quotation-generator',
    name: 'Index',
    component: () => import('../views/Home.vue'),
    redirect: '/quotation-input',
    children: [
      {
        path: 'quotation-input',
        name: 'QuotationInput',
        component: () => import('../views/QuotationInput.vue')
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
      },
      {
        path: 'final-page',
        name: 'FinalPage',
        component: () => import('../views/FinalPage.vue')
      }
      // {
      //   path: '/:catchAll(.*)',
      //   redirect: { name: 'QuotationInput' }
      // }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'QuotationInput' }
  }
]

const router = createRouter(
  {
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
      return { top: 0 }
    }
  }
)

// 若在QuotationInput頁以外處重刷，則回到QuotationInput
router.beforeEach((to, from) => {
  if (!from.name && to.name !== 'QuotationInput') {
    return { name: 'QuotationInput' }
  }
})

export default router
