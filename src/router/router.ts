import { createRouter, createWebHistory } from 'vue-router';
import { HttpService } from '../services/HttpService';

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      redirect: { name: 'Dashboard' }
    },
    {
      path: '/dashboard/',
      name: 'Dashboard',
      redirect: { name: 'ReceiptsList' },
      meta: {authGuard: true},
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: 'my-receipts',
          name: 'ReceiptsList',
          component: () => import('../pages/ReceiptsIndex.vue'),
        },
        {
          path: 'my-receipts/:receiptId',
          name: 'ReceiptDetails',
          component: () => import('../pages/ReceiptDetails.vue'),
        }
      ]
    },
    {
      path: '/sign-up',
      name: 'Register',
      component: () => import('../pages/Register.vue'),
    },
    {
      path: '/sign-in',
      name: 'Login',
      component: () => import('../pages/Login.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('../pages/NotFound.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  const publicRoutes = ['/sign-in', '/sign-up'];
  const isLoggedIn = !!localStorage.getItem(HttpService.TOKEN_KEY);
  if (to.matched.some(record => record.meta.authGuard) && !isLoggedIn) {
    next('/sign-in');
  } else if (publicRoutes.includes(to.path) && isLoggedIn) {
    return next('/');
  } else {
    next();
  }
});

export default router;